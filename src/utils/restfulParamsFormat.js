
export default function (params) {
	return Array.isArray(params) ? params.join(",") : params;
}
