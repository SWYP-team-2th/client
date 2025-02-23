import { SVGProps } from 'react';
import AlertFill from '@/assets/icons/alert_fill_24px.svg?react';
import AlertOutline from '@/assets/icons/alert_outline_24px.svg?react';
import AlertV2 from '@/assets/icons/alert_V2.svg?react';
import ArrowLeft from '@/assets/icons/arrow_left_24px.svg?react';
import ArrowRight from '@/assets/icons/arrow_right_24px.svg?react';
import BellFill from '@/assets/icons/bell_fill_24px.svg?react';
import BellOutline from '@/assets/icons/bell_outline_24px.svg?react';
import BookmarkFill from '@/assets/icons/bookmark_fill_24px.svg?react';
import BookmarkOutline from '@/assets/icons/bookmark_outline_24px.svg?react';
import Check from '@/assets/icons/check_24px.svg?react';
import Cross from '@/assets/icons/cross_24px.svg?react';
import Edit from '@/assets/icons/edit_24px.svg?react';
import HeartFill from '@/assets/icons/heart_fill_24px.svg?react';
import HeartFillRed from '@/assets/icons/heart_fill_Red.svg?react';
import HeartOutline from '@/assets/icons/heart_outline_24px.svg?react';
import HomeFill from '@/assets/icons/home_fill_24px.svg?react';
import HomeOutline from '@/assets/icons/home_outline_24px.svg?react';
import Link from '@/assets/icons/link_24px.svg?react';
import LockFill from '@/assets/icons/lock_fill_24px.svg?react';
import LockOpen from '@/assets/icons/lock_open_24px.svg?react';
import LockOutline from '@/assets/icons/lock_outline_24px.svg?react';
import Logo from '@/assets/icons/logo.svg?react';
import Logout from '@/assets/icons/logout.svg?react';
import Maximize from '@/assets/icons/maximize_24px.svg?react';
import Medal from '@/assets/icons/medal.svg?react';
import Menu from '@/assets/icons/menu_24px.svg?react';
import MessageFill from '@/assets/icons/message_fill_24px.svg?react';
import MessageOutline from '@/assets/icons/message_outline_24px.svg?react';
import Minimize from '@/assets/icons/minimize_24px.svg?react';
import Minus from '@/assets/icons/minus_24px.svg?react';
import More from '@/assets/icons/more_24px.svg?react';
import PhotoPlus from '@/assets/icons/photo_plus_24px.svg?react';
import Plus from '@/assets/icons/plus_24px.svg?react';
import Post from '@/assets/icons/post_24px.svg?react';
import SearchFill from '@/assets/icons/search_fill_24px.svg?react';
import Send from '@/assets/icons/send_24px.svg?react';
import SettingsOutline from '@/assets/icons/settings_outline_24px.svg?react';
import ThumbUpFill from '@/assets/icons/thumb-up_fill_24px.svg?react';
import ThumbUpOutline from '@/assets/icons/thumb-up_outline_24px.svg?react';
import ToastError from '@/assets/icons/toast_error.svg?react';
import ToastInfo from '@/assets/icons/toast_info.svg?react';
import ToastSuccess from '@/assets/icons/toast_success.svg?react';
import ToastWarning from '@/assets/icons/toast_warning.svg?react';
import Trash from '@/assets/icons/trash_24px.svg?react';
import User2Fill from '@/assets/icons/user2_fill_24px.svg?react';
import User2Outline from '@/assets/icons/user2_outline_24px.svg?react';
import UserFill from '@/assets/icons/user_fill_24px.svg?react';
import UserOutline from '@/assets/icons/user_outline_24px.svg?react';
import VoteClose from '@/assets/icons/vote_close.svg?react';
import World from '@/assets/icons/world_24px.svg?react';
export const ICONS = {
  AlertFill,
  AlertOutline,
  AlertV2,
  ArrowLeft,
  ArrowRight,
  BellFill,
  BellOutline,
  BookmarkFill,
  BookmarkOutline,
  Check,
  Cross,
  Edit,
  HeartFill,
  HeartFillRed,
  HeartOutline,
  HomeFill,
  HomeOutline,
  Link,
  LockFill,
  LockOpen,
  LockOutline,
  Maximize,
  Menu,
  MessageFill,
  MessageOutline,
  Minimize,
  Minus,
  More,
  PhotoPlus,
  Plus,
  Post,
  SearchFill,
  SettingsOutline,
  ThumbUpFill,
  ThumbUpOutline,
  ToastError,
  ToastInfo,
  ToastSuccess,
  ToastWarning,
  Trash,
  User2Fill,
  User2Outline,
  UserFill,
  UserOutline,
  VoteClose,
  World,
  Logo,
  Logout,
  Send,
  Medal,
} as const;

export const ICON_SIZE = {
  small: 16,
  medium: 24,
  large: 32,
} as const;

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: keyof typeof ICONS;
  size: keyof typeof ICON_SIZE;
}

export default function Icon({ name, size, ...props }: IconProps) {
  const IconComponent = ICONS[name];
  const sizeConfig = ICON_SIZE[size];
  return (
    <IconComponent
      {...props}
      style={{ width: sizeConfig, height: sizeConfig }}
    />
  );
}
