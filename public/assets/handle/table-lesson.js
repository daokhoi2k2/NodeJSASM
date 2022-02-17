const videoFixedElement = $(".video_fixed")[0];
const videoElement = $("#video")[0];
const playElement = $(".play-btn")[0];
const selectMapElement = $("#selectMap")[0];
const serverElement = $("#tickrate")[0];
const searchText = $("#searchTextLesson")[0];
const lessonResultElement = $("#lesson-result")[0];

const removeLessonElement = $(".removeLesson");

class filterLesson {
	constructor(map = "", server = "", searchValue = "") {
		this.map = map;
		this.server = server;
		this.searchValue = searchValue;
	}

	onfilter = async (map, server, searchValue) => {
		const res = await fetch("http://localhost:3000/api/lessons").then((res) => {
			return res.json();
		});

		let result = res;

		// Filter server
		if (server != "") {
			result = result.filter((item) => {
				return item.tickrateId._id === server;
			});
		}

		if (map != "") {
			result = result.filter((item) => {
				return item.mapId._id === map;
			});
		}

		if (searchValue != "") {
			result = result.filter((item) => {
				const pattern = `${searchValue.toLowerCase()}`;
				const reg = new RegExp(pattern);
				return item.position.toLowerCase().match(reg);
			});
		}
		return result;
	};
}

const filter = new filterLesson("", "", "");

const showBoxVideo = (id, videoUrl) => {
	videoFixedElement.style.display = "block";
	videoElement.src = `/assets/video/${videoUrl}`;

	if ($(playElement).hasClass("playing")) {
		$(playElement).removeClass("playing");
		$(playElement).addClass("paused");
	}
};

const removeLesson = (id, e) => {
	fetch(`/api/lessons/${id}`, { method: "DELETE" })
		.then((res) => {
			if (res.status === 200) {
				$(e).parent().parent().remove();
				Toastify({
					text: "Xóa thành công",
					className: "success",
					style: {
						background: "linear-gradient(to right, #00b09b, #96c93d)",
					},
					gravity: "bottom",
				}).showToast();
			}
		})
		.catch((err) => {
			Toastify({
				text: "Có lỗi xảy ra",
				className: "danger",
				style: {
					background: "linear-gradient(to right, #00b09b, #96c93d)",
				},
				gravity: "bottom",
			}).showToast();
		});
};

const handleCloseVideo = () => {
	videoFixedElement.style.display = "none";
	videoElement.src = "";
};

const renderTables = (data) => {
	const html = data
		.map((item) => {
			return `
			<tr>
				<td>
					<div class="d-flex px-2 py-1">
						<div class="poster" onclick="showBoxVideo('${item.id}', '${item.video_url}')">
							<img
							src="../assets/poster/${item.poster}"
							class="avatar me-3 border-radius-lg"
							alt="${item.poster}"
							/>
						</div>
					</div>
				</td>
				<td>
					<p class="text-xs font-weight-bold mb-0">${item.mapId?.map_name}</p>
					<p class="text-xs text-secondary mb-0">${item.position}</p>
				</td>
				<td class="align-middle text-center text-sm">
					<span class="badge badge-sm bg-gradient-${item.isShow ? "success" : "danger"}">
						${item.isShow ? "Hiện thị" : "Ẩn"}
					</span>
				</td>
				<td class="align-middle text-center text-sm">
					<span class="text-secondary text-xs font-weight-bold">
						${moment.utc(item.video_duration * 1000).format("mm:ss")}
					</span>
				</td>
				<td class="align-middle text-center text-sm">
					<span class="text-secondary text-xs font-weight-bold">
						${item.tickrateId.value} ticks
					</span>
				</td>
				<td class="align-middle text-center">
					<span class="text-secondary text-xs font-weight-bold">
						${moment(item.createdAt).format("DD/MM/YYYY - HH:ss")}
					</span>
				</td>
				<td class="align-middle">
					<a
						href="javascript:;"
						class="text-secondary font-weight-bold"
						data-toggle="tooltip"
						data-original-title="Edit user"
						title="Chi tiết bài học"
					>
						<i class="fas fa-info-circle"></i>
					</a>
					<a
						href="update-lesson/${item._id}"
						class="text-secondary font-weight-bold"
						data-toggle="tooltip"
						data-original-title="Edit user"
						title="Sửa bài học"
					>
						<i class="fas fa-edit"></i>
					</a>
					<a
						href="javascript:;"
						class="text-secondary font-weight-bold"
						data-toggle="tooltip"
						data-original-title="Edit user"
						title="Xóa bài học"
						onclick="removeLesson(${item._id}, this)"
					>
						<i class="far fa-trash-alt"></i>
					</a>
				</td>
			</tr>`;
		})
		.join("");

	lessonResultElement.innerHTML = html;
};

const handleChangeFilter = async () => {
	const data = await filter.onfilter(
		selectMapElement.value,
		serverElement.value,
		searchText.value
	);

	renderTables(data);
};

// Filter
serverElement.addEventListener("change", handleChangeFilter);
selectMapElement.addEventListener("change", handleChangeFilter);
searchText.addEventListener("keyup", handleChangeFilter);
