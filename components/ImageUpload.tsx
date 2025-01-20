"use client";

import { useRef, useState } from "react";

import { IKImage, IKUpload, ImageKitProvider } from "imagekitio-next";
import Image from "next/image";

import { toast } from "@/hooks/use-toast";
import config from "@/lib/config";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (err: any) {
    throw new Error(`Authentication request failed: ${err.message}`);
  }
};

const ImageUpload = ({
  onFileChange,
}: {
  onFileChange: (FilePath: string) => void;
}) => {
  const IKUploadRef = useRef(null);
  const [file, setFile] = useState<{ FilePath: string } | null>(null);

  const onError = (error: any) => {
    console.log(error);

    toast({
      title: `Image upload failed`,
      description: `Your Image could not be uploaded. Please try again.`,
      variant: "destructive",
    });
  };

  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.FilePath);

    toast({
      title: `Image uploaded successfully`,
      description: `${res.filePath} uploaded successfully!`,
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        className="hidden"
        ref={IKUploadRef}
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-upload.png"
      />

      <button
        className="upload-btn"
        onClick={(e) => {
          e.preventDefault();
          // @ts-expect-ignore
          if (IKUploadRef.current) {
            IKUploadRef.current?.click();
          }
        }}
      >
        <Image
          src="/icons/upload.svg"
          alt="upload-icon"
          width={20}
          height={20}
        />

        <p className="text-base text-light-100">Upload a file</p>
      </button>

      {file && <p className="upload-filename">{file.FilePath}</p>}

      {file && (
        <IKImage
          alt={file.FilePath}
          path={file.FilePath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
};

export default ImageUpload;
