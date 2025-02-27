import { useDialog } from './components/common/Dialog/hooks';
import ImageDetailModal from '@/components/vote-detail/ImageDetailModal';

function App() {
  const { openDialog } = useDialog();

  return (
    <>
      <button onClick={() => openDialog(<ImageDetailModal />)}>click</button>
    </>
  );
}

export default App;
