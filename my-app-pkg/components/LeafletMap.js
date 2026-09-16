"use client";

// 실제 지도(OpenStreetMap 기반 Leaflet) 컴포넌트.
// - "use client" + 이 컴포넌트를 사용하는 쪽에서 next/dynamic(ssr:false)로 불러와
//   서버에서는 절대 실행되지 않고(=window/document 참조 문제 없음) 브라우저에서만 렌더링됩니다.
// - 지도 타일은 OpenStreetMap 무료 타일 서버를 사용하므로 별도 API 키 없이도
//   바로 동작합니다(인터넷 연결은 필요합니다 — 실제 지도이기 때문입니다).
// - Google Maps로 교체하고 싶다면 이 파일의 L.tileLayer(...) 부분만 바꾸면 됩니다.

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const TAG_COLORS = {
  관광지: "#f4a268",
  맛집: "#2f6fed",
  숙소: "#24a36a",
};

function pinIcon(color, active) {
  const size = active ? 22 : 15;
  return L.divIcon({
    className: "pz-map-pin",
    html: `<span style="
      display:block;
      width:${size}px;height:${size}px;
      border-radius:999px;
      background:${color};
      border:3px solid #ffffff;
      box-shadow:0 2px 10px rgba(18,23,63,.45);
    "></span>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

/**
 * props
 * - places: [{ id, name, tag, walk, lat, lng }]
 * - selectedId: 현재 선택된 place id (있으면 해당 마커를 강조 + 지도 중심 이동)
 * - onSelectPlace(id): 마커 클릭 시 호출
 * - defaultCenter: [lat, lng]
 */
export default function LeafletMap({
  places = [],
  selectedId = null,
  onSelectPlace,
  defaultCenter = [35.7141, 139.7867],
  defaultZoom = 13,
}) {
  const elRef = useRef(null);
  const mapRef = useRef(null);
  const markersRef = useRef(new Map());
  const onSelectRef = useRef(onSelectPlace);
  onSelectRef.current = onSelectPlace;

  // 지도는 최초 1번만 생성합니다.
  useEffect(() => {
    if (!elRef.current || mapRef.current) return;

    const map = L.map(elRef.current, {
      center: defaultCenter,
      zoom: defaultZoom,
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors',
    }).addTo(map);

    mapRef.current = map;

    // 사이드바/레이아웃 변화로 지도 컨테이너 크기가 바뀌어도 타일이 깨지지 않도록
    // 컨테이너 크기 변화를 감지해서 다시 계산해줍니다.
    const ro = new ResizeObserver(() => {
      map.invalidateSize();
    });
    ro.observe(elRef.current);

    return () => {
      ro.disconnect();
      map.remove();
      mapRef.current = null;
      markersRef.current.clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 목록(검색/필터 결과)이 바뀔 때마다 마커를 동기화합니다.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const nextIds = new Set(places.map((p) => p.id));

    // 더 이상 목록에 없는 마커 제거
    markersRef.current.forEach((marker, id) => {
      if (!nextIds.has(id)) {
        marker.remove();
        markersRef.current.delete(id);
      }
    });

    const bounds = [];
    places.forEach((p) => {
      if (typeof p.lat !== "number" || typeof p.lng !== "number") return;
      bounds.push([p.lat, p.lng]);
      const active = p.id === selectedId;
      const color = TAG_COLORS[p.tag] || "#1e2761";

      let marker = markersRef.current.get(p.id);
      if (!marker) {
        marker = L.marker([p.lat, p.lng], { icon: pinIcon(color, active) });
        marker.bindTooltip(p.name, {
          permanent: true,
          direction: "top",
          offset: [0, -10],
          className: "pz-map-tooltip",
        });
        marker.bindPopup(
          `<div class="pz-map-popup">
             <span class="pz-map-popup-tag">${p.tag}</span>
             <p class="pz-map-popup-name">${p.name}</p>
             <p class="pz-map-popup-walk">${p.walk ?? ""}</p>
           </div>`
        );
        marker.on("click", () => onSelectRef.current?.(p.id));
        marker.addTo(map);
        markersRef.current.set(p.id, marker);
      } else {
        marker.setLatLng([p.lat, p.lng]);
      }
      marker.setIcon(pinIcon(color, active));
      marker.setZIndexOffset(active ? 1000 : 0);
    });

    if (bounds.length === 1) {
      map.setView(bounds[0], Math.max(map.getZoom(), 15), { animate: true });
    } else if (bounds.length > 1) {
      map.fitBounds(bounds, { padding: [56, 56], maxZoom: 16 });
    }
    // 검색 결과가 0개면 기존 화면을 그대로 유지합니다(빈 지도로 튀지 않도록).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [places]);

  // 선택된 장소가 바뀌면 그 위치로 지도를 이동하고 팝업을 엽니다.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedId) return;
    const marker = markersRef.current.get(selectedId);
    if (!marker) return;
    map.panTo(marker.getLatLng(), { animate: true });
    marker.openPopup();
  }, [selectedId]);

  return <div ref={elRef} className="h-full w-full" />;
}
