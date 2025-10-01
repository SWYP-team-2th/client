import { SVGProps } from 'react';
import ArrowLeft from '@/assets/icons/arrow_left_24px.svg?react';
import ArrowRight from '@/assets/icons/arrow_right_24px.svg?react';
import BellOutline from '@/assets/icons/bell_outline_24px.svg?react';
import BellOutlinePoint from '@/assets/icons/bell_outline_point.svg?react';
import CheckLarge from '@/assets/icons/check_large.svg?react';
import CheckSmall from '@/assets/icons/check_small.svg?react';
import Close from '@/assets/icons/close.svg?react';
import ThickClose from '@/assets/icons/close_thick.svg?react';
import Cross from '@/assets/icons/cross_24px.svg?react';
import DeadLineDarkGray from '@/assets/icons/dead-Line-dark-gray.svg?react';
import DeadLineGray from '@/assets/icons/dead-line-gray.svg?react';
import DeadLine from '@/assets/icons/dead_line.svg?react';
import Edit from '@/assets/icons/edit_24px.svg?react';
import EditFill from '@/assets/icons/edit_fill.svg?react';
import FullPhoto from '@/assets/icons/full.svg?react';
import HomeFilled from '@/assets/icons/home-filled.svg?react';
import HomeOutline from '@/assets/icons/home.svg?react';
import KakaoLogo from '@/assets/icons/kako_logo.svg?react';
import LinkWhite from '@/assets/icons/link_white.svg?react';
import Logo from '@/assets/icons/logo.svg?react';
import LogoutGray from '@/assets/icons/logout_gray.svg?react';
import Menu from '@/assets/icons/menu_24px.svg?react';
import MessageOutlineDarkGray from '@/assets/icons/message-outline-dark-gray.svg?react';
import MessageOutline from '@/assets/icons/message_outline_24px.svg?react';
import More from '@/assets/icons/more_24px.svg?react';
import PencilGray from '@/assets/icons/pencil-gray.svg?react';
import PhotoPlusWhite from '@/assets/icons/photo_plus_gray.svg?react';
import Plus from '@/assets/icons/plus_24px.svg?react';
import Post from '@/assets/icons/post_24px.svg?react';
import PostWhite from '@/assets/icons/post_white.svg?react';
import ArrowRightGray from '@/assets/icons/right_arrow_gray.svg?react';
import SendGray from '@/assets/icons/send_2.svg?react';
import SettingsOutline from '@/assets/icons/settings_outline_24px.svg?react';
import ThumbUpOutlineGray from '@/assets/icons/thumbs_up.svg?react';
import ThumbUpFillGray from '@/assets/icons/thumbs_up_filled.svg?react';
import ToastError from '@/assets/icons/toast_error.svg?react';
import ToastInfo from '@/assets/icons/toast_info.svg?react';
import ToastSuccess from '@/assets/icons/toast_success.svg?react';
import ToastWarning from '@/assets/icons/toast_warning.svg?react';
import Trash from '@/assets/icons/trash_24px.svg?react';
import UpLoad from '@/assets/icons/upload.svg?react';
import User2Fill from '@/assets/icons/user2_fill_24px.svg?react';
import User2Outline from '@/assets/icons/user2_outline_24px.svg?react';

export const ICONS = {
  BellOutlinePoint,
  DeadLineGray,
  UpLoad,
  CheckLarge,
  CheckSmall,
  LogoutGray,
  SendGray,
  ArrowRightGray,
  MessageOutlineDarkGray,
  DeadLineDarkGray,
  PostWhite,
  HomeFilled,
  PhotoPlusWhite,
  ArrowLeft,
  ArrowRight,
  BellOutline,
  DeadLine,
  Close,
  ThickClose,
  Cross,
  Edit,
  HomeOutline,
  Menu,
  MessageOutline,
  More,
  Plus,
  Post,
  SettingsOutline,
  ToastError,
  ToastInfo,
  ToastSuccess,
  ToastWarning,
  Trash,
  User2Fill,
  User2Outline,
  Logo,
  KakaoLogo,
  PencilGray,
  LinkWhite,
  FullPhoto,
  ThumbUpFillGray,
  ThumbUpOutlineGray,
  EditFill,
} as const;

export const ICON_SIZE = {
  xSmall: 12,
  small: 16,
  medium: 24,
  large: 28,
  xLarge: 32,
  xxLarge: 40,
} as const;

export const ICON_COLORS = {
  primary: '#8B5CF6',
  secondary: '#6B7280',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#9CA3AF',
  red: '#FF0000',
  blue: '#3B82F6',
  green: '#22C55E',
} as const;

export interface IconProps extends SVGProps<SVGSVGElement> {
  name: keyof typeof ICONS;
  size: keyof typeof ICON_SIZE;
  strokeColor?: string | keyof typeof ICON_COLORS; // stroke 색상 추가
  strokeWidth?: number; // stroke 두께 추가
}

export default function Icon({
  name,
  size,
  strokeColor,
  strokeWidth,
  className,
  ...props
}: IconProps) {
  const IconComponent = ICONS[name];
  const sizeConfig = ICON_SIZE[size];

  // 색상 처리 로직
  const getColor = (colorProp?: string | keyof typeof ICON_COLORS) => {
    if (!colorProp) return 'currentColor';
    if (typeof colorProp === 'string' && colorProp.startsWith('#'))
      return colorProp;
    if (
      typeof colorProp === 'string' &&
      ICON_COLORS[colorProp as keyof typeof ICON_COLORS]
    ) {
      return ICON_COLORS[colorProp as keyof typeof ICON_COLORS];
    }
    return colorProp;
  };

  const strokeColorValue = getColor(strokeColor);

  // Tailwind 색상 클래스 매핑
  const getTailwindColorClass = (color: string) => {
    const colorMap: Record<string, string> = {
      primary: 'text-purple-500',
      secondary: 'text-gray-500',
      success: 'text-green-500',
      warning: 'text-yellow-500',
      error: 'text-red-500',
      white: 'text-white',
      black: 'text-black',
      gray: 'text-gray-400',
      red: 'text-red-500',
      blue: 'text-blue-500',
      green: 'text-green-500',
    };

    return colorMap[color] || '';
  };

  // 동적 스타일 생성
  const dynamicStyle = {
    width: sizeConfig,
    height: sizeConfig,
    ...(strokeColorValue && {
      '--icon-stroke': strokeColorValue,
    }),
    ...(strokeWidth && {
      '--icon-stroke-width': `${strokeWidth}px`,
    }),
  } as React.CSSProperties;

  // Tailwind 색상 클래스 추가
  const colorClass =
    strokeColor &&
    typeof strokeColor === 'string' &&
    !strokeColor.startsWith('#')
      ? getTailwindColorClass(strokeColor)
      : '';

  const combinedClassName = `${className || ''} ${colorClass}`.trim();

  return (
    <IconComponent
      {...props}
      className={combinedClassName}
      style={dynamicStyle}
    />
  );
}
