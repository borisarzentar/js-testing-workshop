export default function ItemList({
    items,
    testId,
    onSelect,
    itemClassName,
}) {
    return (
        <div>
            {items.map((item) => (
                <div
                    key={item.value}
                    onClick={() => onSelect(item)}
                    className={itemClassName}
                    data-test-id={testId}
                >
                    {item.label}
                </div>
            ))}
        </div>
    );
}
