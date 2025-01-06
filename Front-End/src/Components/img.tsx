import { DownloadOutlined, SendOutlined } from "@ant-design/icons";
import { Button, Image, Input, Space } from "antd";
import React, { useState } from "react";
interface QueryData {
  inputs: string;
}

const TextToImageComponent: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [inputpromt, setinputpromt] = useState<string>("");
  const query = async (data: QueryData) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
        {
          headers: {
            Authorization: "Bearer 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",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        }
      );
      const result = await response.blob();
      const url = URL.createObjectURL(result);
      console.log(result);

      setImageUrl(url);
    } catch (err) {
      setError("Error fetching image");
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (url: string) => {
    const link = document.createElement("a");

    link.href = url;
    link.download = inputpromt;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const get_img = (promt: string) => {
    query({ inputs: promt });
  };

  return (
    <div className="flex-1 justify-center justify-items-center gap-3">
      <h1>Text-to-Image </h1>
      <Space direction="vertical" size="large">
        <Space.Compact style={{ width: "100%" }}>
          <Input
            placeholder="Enter You'r Text..."
            value={inputpromt}
            className="w-full"
            onChange={(e) => setinputpromt(e.currentTarget.value)}
          />
          {loading ? (
            <Button type="default" loading></Button>
          ) : (
            <Button type="default" onClick={() => get_img(inputpromt)}>
              <SendOutlined />
            </Button>
          )}
        </Space.Compact>
      </Space>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {imageUrl ? (
        <div className="my-3">
          <Image
            width={400}
            height={500}
            alt="Generated"
            src={imageUrl}
            preview
          />
          <br />
          <Button
            onClick={() => {
              downloadImage(imageUrl);
            }}
            autoInsertSpace
            color="danger"
            type="primary"
            className="bg-red-700 hover:bg-red-900"
          >
            <DownloadOutlined className="text-white" /> Download
          </Button>
        </div>
      ) : (
        !loading && <p>Try now!</p>
      )}
    </div>
  );
};

export default TextToImageComponent;
