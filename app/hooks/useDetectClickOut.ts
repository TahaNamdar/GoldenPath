import { useEffect, useRef, useState } from "react";

export default function useDetectClickOut(initState: any) {
  const triggerRef = useRef<HTMLInputElement>(null); // optional
  const nodeRef = useRef<HTMLInputElement>(null); // required

  const [show, setShow] = useState(initState);
  const handleClickOutside = (event: React.ChangeEvent) => {
    //if click is on trigger element, toggle modal
    if (triggerRef.current && triggerRef.current.contains(event.target)) {
      return setShow(!show);
    }

    //if modal is open and click is outside modal, close it
    if (nodeRef.current && !nodeRef.current.contains(event.target)) {
      return setShow(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside as any, true);
    return () => {
      document.removeEventListener("click", handleClickOutside as any, true);
    };
  });
  return {
    triggerRef,
    nodeRef,
    show,
    setShow,
  };
}
