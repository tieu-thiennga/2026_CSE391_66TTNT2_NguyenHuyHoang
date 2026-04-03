function ScholarItem({ item}) {
    return (
        <tr className="">
            <td>{item.name}</td>
            <td>{item.sponsor}</td>
            <td>{item.value}</td>
            <td>{item.email}</td>
            <td>{item.deadline}</td>
        </tr>
    );
}
export default ScholarItem;
