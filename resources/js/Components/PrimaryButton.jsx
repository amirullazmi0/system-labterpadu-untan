export default function PrimaryButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `btn btn-wide btn-sm
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
