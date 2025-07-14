import {
  TNotificationContextType,
  TNotificationPosition,
  TNotificationMode,
  TNotificationType,
  TNotify,
} from "./notification";

import { TPost } from "./services";

type TApiResponse<T> = {
  data?: T;
  message: string;
  ok: boolean;
  status: number;
};

export type {
  TNotificationContextType,
  TNotificationPosition,
  TNotificationMode,
  TNotificationType,
  TNotify,
  TPost,
  TApiResponse,
};
