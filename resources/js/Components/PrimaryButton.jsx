export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `btn btn-wide btn-black btn-sm
                } ` + className
            }
        // disabled={disabled}
        >
            {children}
        </button>
    );
}
