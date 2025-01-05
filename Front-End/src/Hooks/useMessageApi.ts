import { message } from 'antd';

const useMessageApi = (props:{ok:boolean}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    messageApi.open({
      type: 'loading',
      content: 'Action in progress..',
      duration: 2.5,
    });

    setTimeout(() => {
      if (props.ok) {
        messageApi.success("Success", 2.5);
      }
      else {
      message.error('Sameting went wrong try agen', 2.5);
      }
    }, 2500);
  };

  return { success, contextHolder };
};

export default useMessageApi;