import { useRef, useEffect, useCallback } from 'react';

interface UseDialogOptions {
    onClose: () => void;
    closeOnEscape?: boolean;
    closeOnOutsideClick?: boolean;
}

export function useDialog({
    onClose,
    closeOnEscape = true,
    closeOnOutsideClick = true,
}: UseDialogOptions) {
    const dialogRef = useRef<HTMLDivElement | null>(null);

    const handleClose = useCallback(() => {
        onClose();
    }, [onClose]);

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (closeOnEscape && event.key === 'Escape') {
                handleClose();
            }
        };

        const handleOutsideClick = (event: MouseEvent) => {
            if (
                closeOnOutsideClick &&
                dialogRef.current &&
                event.target === dialogRef.current
            ) {
                handleClose();
            }
        };

        document.addEventListener('keydown', handleEscKey);
        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('keydown', handleEscKey);
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [handleClose, closeOnEscape, closeOnOutsideClick]);

    return { dialogRef, handleClose };
}