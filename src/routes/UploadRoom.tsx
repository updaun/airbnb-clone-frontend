import HostOnlyPage from "../components/HostOnlyPage";
import ProtectedPage from "../components/ProtectedPage";
import useHostOnlyPage from "../components/useHostOnlyPage";

export default function UploadRoom() {
    useHostOnlyPage();
    return (
        <ProtectedPage>
            {/* <HostOnlyPage> */}
                <h1>upload roommmmmm</h1>
            {/* </HostOnlyPage> */}
        </ProtectedPage>
    );
}