export default function EditBlogLayout({ children }) {
    return (
        <main className="flex-grow flex justify-center py-8 md:py-12 lg:py-16 px-4">
            <div className="w-full max-w-4xl">
                {children}{" "}
                {/* This is where your BLogEditor and HeadingEditor will render */}
            </div>
        </main>
    );
}
