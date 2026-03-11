// src/components/common/ImageSprite.tsx
import React from 'react';

// 1. 외부에서 주입받을 속성들의 타입을 정의합니다.
interface ImageSpriteProps {
  url: string;              // 스프라이트 이미지 경로 (예: '/images/sprite.png')
  positionX: number;        // 잘라낼 X 좌표 (px)
  positionY: number;        // 잘라낼 Y 좌표 (px)
  width: number;            // 화면에 보여줄 가로 길이 (px)
  height: number;           // 화면에 보여줄 세로 길이 (px)
  backgroundSize?: string;  // (선택) 원본 이미지 비율 조정 (예: '440px 411px')
  className?: string;       // (선택) 추가로 적용할 Tailwind 클래스 (여백, 커서 등)
  onClick?: () => void;     // (선택) 클릭 이벤트
}

export default function ImageSprite({
  url,
  positionX,
  positionY,
  width,
  height,
  backgroundSize = 'auto',  // 기본값
  className = '',
  onClick,
}: ImageSpriteProps) {
  return (
    <div
      onClick={onClick}
      // Tailwind 클래스: 기본적으로 글자처럼 배치되도록 inline-block 적용
      // 외부에서 주입한 className(예: 'cursor-pointer mt-2')이 있으면 뒤에 합쳐줍니다.
      className={`inline-block ${className}`} 
      
      // 인라인 스타일: 픽셀 좌표처럼 매번 숫자가 바뀌는 값들은 인라인으로 처리합니다.
      style={{
        backgroundImage: `url(${url})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: `${positionX}px ${positionY}px`,
        backgroundSize: backgroundSize,
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  );
}