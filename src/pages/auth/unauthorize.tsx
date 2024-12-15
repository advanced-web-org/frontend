export default function UnauthorizePage() {
  return (
    <div className="flex flex-row">
      <div>
        <img
          src="src\assets\unauthorize.jpg"
          alt=""
          style={{ maxBlockSize: "70vh" }}
        />
      </div>
      <div className="flex flex-col justify-center gap-4">
        <div className="text-5xl font-bold text-red-700">Unauthorize</div>
        <div className="text-2xl font-semibold text-neutral-700">
          You are not authorized to view this page.
        </div>
      </div>
    </div>
  );
}
