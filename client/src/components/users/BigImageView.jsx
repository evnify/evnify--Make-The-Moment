import {React,useState} from 'react'
import { Button, Modal ,ConfigProvider} from 'antd';


function BigImageView() {
    const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  
  return (
    <div>
      <div>

      </div>
      <ConfigProvider
                theme={{
                    components: {
                        
                            Modal: {contentBg:"rgba(0,0,0,0)",boxShadow:"none"}
                        
                    },
                }}
            >
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer ={null} width={700} height={635} >
      <div className='center'>
      <div className='popUpPackageBigImg_72'>
        <p>helloo</p>       {/* item name */}
        <div className='innerBoxBigImg_72'>

        </div>
      </div>
      </div>
      </Modal>
      </ConfigProvider>
    </div>
  )
}

export default BigImageView
