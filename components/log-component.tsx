'use client';

import {
  clearMessage,
  getUnloadedLogMessages,
  updateLogLoadStates,
} from '@/store/log-slice';
import { MESSAGE_TYPE } from '@/types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';

export function LogComponent() {
  const unloadedErrors: MESSAGE_TYPE[] = useSelector(getUnloadedLogMessages());
  const dispatch = useDispatch();

  useEffect(() => {
    if (unloadedErrors.length > 0) {
      const loadedMsgs: string[] = [];

      unloadedErrors.forEach((err) => {
        const onDismiss = () => {
          dispatch(clearMessage({ text: err.text }));
        };

        if (err.type === 'error') {
          toast.error(err.text, { onDismiss, onAutoClose: onDismiss });
        } else if (err.type === 'info') {
          toast.info(err.text, { onDismiss, onAutoClose: onDismiss });
        } else if (err.type === 'success') {
          toast.success(err.text, { onDismiss, onAutoClose: onDismiss });
        } else {
          toast.info(err.text, { onDismiss, onAutoClose: onDismiss });
        }

        loadedMsgs.push(err.text);
      });

      dispatch(updateLogLoadStates(loadedMsgs));
    }
  }, [unloadedErrors]);

  return <></>;
}
