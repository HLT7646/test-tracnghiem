'use client'
import styles from './sidebar.module.scss'
import { Image, Button, Modal, message, Upload, Avatar, Input } from 'antd';
import Cookies from 'js-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import type { GetProp, UploadProps, UploadFile } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import CustomModal from './custommodal.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { setUsername, setEmail, setImage, setUser } from '@/redux/reducer/userSlice';

export default function SideBar() {
    const t = useTranslations();
    const router = useRouter();
    const pathname = usePathname().split('/');
    const dispatch = useDispatch();

    const [avatar, setAvatar] = useState<string>('/avatar.png');
    const [isOpenModal, setIsOpen] = useState(false);
    const [newUsername, setNewUsername] = useState<string>('');
    const [newEmail, setNewEmail] = useState<string>('');
    const [newImage, setNewImage] = useState<string>(avatar);

    type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

    const username = useSelector((state: any) => state.user.username);
    const email = useSelector((state: any) => state.user.email);
    const img = useSelector((state: any) => state.user.image);

    useEffect(() => {
        setNewUsername(username);
        setNewEmail(email);
        setNewImage(img);
    }, [username, email, img]);

    const logOut = () => {
        Cookies.remove('token');
        router.push(`${pathname[1]}/login`);
    };

    const handleEditAvatar = () => {
        setIsOpen(true);
    };

    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [fileList, setFileList] = useState<UploadFile[]>([]);

    const getBase64 = (file: FileType): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (error) => reject(error);
        });

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }

        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => setFileList(newFileList);

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>{t('sidebar.upload')}</div>
        </button>
    );

    const handleOk = () => {
        setAvatar(previewImage || newImage);
        setPreviewImage('');
        setFileList([]);
        setIsOpen(false);

        dispatch(setUsername(newUsername));
        dispatch(setEmail(newEmail));
        dispatch(setImage(previewImage || newImage));
    };

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        handleResize();

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const sidebarContent = (
        <div className={styles.sidebar}>
            <div className="info">
                <div className={styles.sidebar__avatar}>
                    <Avatar src={avatar} />
                </div>
                <div className={styles.user_info}>
                    <p className="username">{t('sidebar.user')}:{username}</p>
                    <p className="point">Email:{email} </p>
                </div>
            </div>
            <div className={styles.sidebar__btn}>
                <Button type="text" className={styles.btn__logout + ' uppercase'} onClick={handleEditAvatar}>
                    {t('sidebar.editAvatar')}
                </Button>
                <Button type="text" htmlType="submit" className={styles.btn__logout + ' mt-5 uppercase'} onClick={logOut}>
                    {t('sidebar.logout')}
                </Button>
            </div>
        </div>
    );

    return (
        <>
            {isMobile ? (
                <div className={styles.buttonmenu}>
                    <Button type="text" onClick={showModal}>
                        <img src="/buttonmenu.png" alt="Menu" />
                    </Button>
                    <CustomModal isVisible={isModalVisible} onClose={handleModalClose}>
                        {sidebarContent}
                    </CustomModal>
                </div>
            ) : (
                sidebarContent
            )}
            <CustomModal isVisible={isOpenModal} onClose={() => setIsOpen(false)}>
                <Modal
                    open={isOpenModal}
                    title="Edit Info"
                    onOk={handleOk}
                    onCancel={() => setIsOpen(false)}
                    footer={[
                        <Button key="back" onClick={() => setIsOpen(false)}>
                            {t('sidebar.cancel')}
                        </Button>,
                        <Button key="submit" type="primary" onClick={handleOk}>
                            Save
                        </Button>,
                    ]}
                >
                    <div className={styles.modal}>
                        <div style={{ marginBottom: '50px' }}>
                            <Upload
                                action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
                                listType="picture-circle"
                                fileList={fileList}
                                onPreview={handlePreview}
                                onChange={handleChange}
                                beforeUpload={file => {
                                    const reader = new FileReader();
                                    const fileUrl = URL.createObjectURL(file);
                                    reader.readAsText(file);
                                    setPreviewImage(fileUrl);
                                    return false;
                                }}
                            >
                                {fileList.length > 0 ? null : uploadButton}
                            </Upload>
                        </div>
                        <Input
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                            placeholder={"Username"}
                            style={{ marginBottom: '50px' }}
                        />
                        <Input
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder={"Email"}
                        />

                        {previewImage && (
                            <Image
                                wrapperStyle={{ display: 'none' }}
                                preview={{
                                    visible: previewOpen,
                                    onVisibleChange: (visible) => setPreviewOpen(visible),
                                    afterOpenChange: (visible) => !visible,
                                }}
                                src={previewImage}
                            />
                        )}
                    </div>
                </Modal>
            </CustomModal>
        </>
    );
}
