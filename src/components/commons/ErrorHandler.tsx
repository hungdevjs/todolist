import { FC } from 'react';

interface Props {
  text: string;
}

const ErrorHandler: FC<Props> = ({ text }: Props) => {
  return <p className="mb-2 error-text">{text}</p>;
};

export default ErrorHandler;
