import ImageList from '@/components/home/HomeImages/ImageList';
import HomeInfo from '@/components/home/HomeInfo';
import HomeTaskCheck from '@/components/home/HomeTaskCheck';

export default function HomeSection() {
  return (
    <div className="pl-[10px] pt-[16px] pb-[13px] bg-gray-100 rounded-2xl shadow-[0px_2px_10px_0px_rgba(0,0,0,0.02),0px_2px_12px_0px_rgba(0,0,0,0.04),0px_4px_30px_0px_rgba(0,0,0,0.05)]">
      <HomeInfo />
      <ImageList />
      <HomeTaskCheck />
    </div>
  );
}
