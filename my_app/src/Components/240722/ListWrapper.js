import { List } from "./List";

export function ListWrapper() {

    // Javascript 코딩 영역
    const products = [
        {title: "Banana"},
        {title: "Apple"},
        {title: "Grape"},
    ];

    // https://i.imgur.com/WohslsL_d.webp?maxwidth=520&shape=thumb&fidelity=high
    const user = {
        name: "Hedy Lamarr",
        imageUrl: "https://i.imgur.com/WohslsL.png"
    }

    // 속성 형태로 전달
    return (
        <>
            <List products={products} user={user} />
        </>
    );
}