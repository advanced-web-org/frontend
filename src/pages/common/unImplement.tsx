import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function UnImplementPage() {
  return (
    <div className="flex flex-row">
      <div>
        <img
          src="/src/assets/not-implement.jpg"
          alt=""
          style={{ maxBlockSize: "70vh" }}
        />
      </div>
      <div className="flex flex-col justify-center gap-4">
        <div className="text-5xl font-bold text-red-700">Unimplemented</div>
        <div className="text-2xl font-semibold text-neutral-700">
          Sorry we haven't implemented this page yet.
        </div>
        <Button variant="outline" size={"lg"} className="w-40">
          <Link
            to="/"
            className="flex flex-row items-center justify-center gap-2"
          >
            <ArrowLeft size={24} /> <p className="text-base flex">Go Home</p>
          </Link>
        </Button>
      </div>
    </div>
  );
}
