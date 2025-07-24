interface PageSectionProps {
  children: React.ReactNode;
  title: string;
  icon?: string;
}
export default function PageSection({ children, title, icon }: PageSectionProps) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center mb-10">
      <h2 className="text-xl font-semibold">
        {icon && <i className={`fa-solid fa-${icon} mr-2`}></i>}
        {title}
        {icon && <i className={`fa-solid fa-${icon} ml-2`}></i>}
      </h2>
      {children}
    </div>
  );
}
