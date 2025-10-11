import { Loader } from "lucide-react";

export default function LoadingCategory() {
  return (
    <div className="space-y-3">
      <Loader className="size-6 animate-spin" />
      <div className="grid grid-cols-2 gap-8">
        <div className="group">
          <div className="aspect-[4/3] relative w-full overflow-hidden">
            <div className="size-full object-cover bg-app-light-gray" />
          </div>
        </div>
        <div className="group">
          <div className="aspect-[4/3] relative w-full overflow-hidden">
            <div className="size-full object-cover bg-app-light-gray" />
          </div>
        </div>
        <div className="group">
          <div className="aspect-[4/3] relative w-full overflow-hidden">
            <div className="size-full object-cover bg-app-light-gray" />
          </div>
        </div>
        <div className="group">
          <div className="aspect-[4/3] relative w-full overflow-hidden">
            <div className="size-full object-cover bg-app-light-gray" />
          </div>
        </div>
        <div className="group">
          <div className="aspect-[4/3] relative w-full overflow-hidden">
            <div className="size-full object-cover bg-app-light-gray" />
          </div>
        </div>
      </div>
    </div>
  );
}
