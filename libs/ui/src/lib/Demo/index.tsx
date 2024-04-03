export type DemoProps = {
  greeting?: string;
};

export const Demo = ({ greeting }: DemoProps) => (
  <div className="flex justify-center items-center gap-2">
    <h1>Welcome to Ui!</h1>
    {greeting && <p className="font-semibold text-sm">{greeting}</p>}
  </div>
);

export default Demo;
