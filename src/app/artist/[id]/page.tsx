export default function Page({ params }: { params: { id: string } }) {
    return <div>My Artist: {params.id}</div>
}
