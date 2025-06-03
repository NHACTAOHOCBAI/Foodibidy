/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

interface UploadImageProps {
    fileList: UploadFile[];
    setFileList: (files: UploadFile[]) => void;
    isPending?: boolean;
    circle?: boolean;
    width?: number;
    height?: number;
}

const getBase64 = (file: FileType): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = reject;
    });

const UploadImage = ({
    fileList,
    setFileList,
    isPending = false,
    circle = false,
    width = 160,
    height = 160,
}: UploadImageProps) => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');

    const handlePreview = async (file: UploadFile) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj as FileType);
        }
        setPreviewImage(file.url || (file.preview as string));
        setPreviewOpen(true);
    };

    const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
    };

    const uploadButton = (
        <div style={{ textAlign: 'center' }}>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return (
        <>
            <Upload
                disabled={isPending}
                beforeUpload={() => false}
                listType={circle ? 'picture-circle' : 'picture-card'}
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                accept="image/*"
                maxCount={1}
                style={{ width }}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>

            <Image
                wrapperStyle={{ display: 'none' }}
                preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) => {
                        if (!visible) setPreviewImage('');
                    },
                }}
                src={previewImage}
                width={width}
                height={height}
            />
        </>
    );
};

export default UploadImage;
