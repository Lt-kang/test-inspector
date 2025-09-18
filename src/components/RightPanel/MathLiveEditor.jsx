// components/MathLiveEditor.jsx
import { useEffect, useRef } from 'react';
import 'mathlive'; // <math-field> 커스텀 엘리먼트 등록

export default function MathLiveEditor() {
  // const ref = useRef(null);

  // useEffect(() => {
  //   const el = ref.current;
  //   if (!el) return;

  //   // 외부에서 value가 바뀌면 동기화
  //   if (typeof value === 'string' && el.value !== value) {
  //     el.value = value;
  //   }

  //   const handler = (e) => onChange?.(e.target.value);
  //   el.addEventListener('input', handler);

  //   // Ctrl+Shift+V 입력 시 LaTeX 문자열 복사
  //   const keydownHandler = async (e) => {
  //     if (
  //       (e.ctrlKey || e.metaKey) &&
  //       e.shiftKey &&
  //       e.code === 'KeyV'
  //     ) {
  //       e.preventDefault();
  //       try {
  //         await navigator.clipboard.writeText(el.value || '');
  //         // 복사 성공 시 사용자에게 알림(선택적)
  //         // alert('LaTeX가 클립보드에 복사되었습니다.');
  //       } catch (err) {
  //         // 복사 실패 시 사용자에게 알림(선택적)
  //         // alert('클립보드 복사에 실패했습니다.');
  //       }
  //     }
  //   };
  //   el.addEventListener('keydown', keydownHandler);

  //   return () => {
  //     el.removeEventListener('input', handler);
  //     el.removeEventListener('keydown', keydownHandler);
  //   };
  // }, [value, onChange]);

  return (
    <math-field smart-mode
      // ref={ref}
      style={{
        width: '100%',
        minHeight: 56,
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 18,
        background: 'white',
      }}
      // placeholder 속성도 지원
      // virtual-keyboard-policy="manual"  // 모바일 키보드 제어 옵션
    />
  );
}
