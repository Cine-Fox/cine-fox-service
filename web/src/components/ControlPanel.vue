<script setup>
import { onBeforeUnmount, ref, onMounted, computed } from "vue";
import { showNotify } from "vant";

let websocket = null;
let previewWebsocket = null;
// let host = "192.168.3.74";
let host = window.location.hostname;
const isConnected = ref(false);
const active = ref(-1);
const isShow = ref(false);
const isShowGain = ref(false);
const options = ref([]);
const showLeft = ref(false);
const enableLine = ref(false);
const enableCross = ref(false);

const awb = ref(false);
const fps = ref("24");
const iso = ref("100");
const sht = ref("45");
const zoom = ref("1.0");
const redGain = ref("10");
const blueGain = ref("12");
const cpu = ref(0);
const cpuTem = ref(0);
const list = ref([]);
const sensor = ref("??");
const isRecording = ref("0");
const ssd = ref(1);
const currentSSD = ref(0);
const isShowDialog = ref(false);
const renameMsg = ref({
  oldName: "",
  newName: "",
});
const isShowDeleteDialog = ref(false);
const deleteName = ref("");
const redGainShow = computed(() => {
  return (redGain.value / 10).toFixed(1);
});
const blueGainShow = computed(() => {
  return (blueGain.value / 10).toFixed(1);
});
const isShowCanvas = ref(false);
const hasImg = ref(false);

const fpsOptions = [
  { text: "8" },
  { text: "24" },
  { text: "30" },
  { text: "50" },
  { text: "60" },
];

const zoomOptions = [
  { text: "1x", value: "1.0" },
  { text: "2x", value: "2.0" },
  { text: "4x", value: "4.0" },
  { text: "8x", value: "8.0" },
];

const isoOptions = [
  { text: "100" },
  { text: "200" },
  { text: "400" },
  { text: "800" },
  { text: "1600" },
  { text: "3200" },
  { text: "6400" },
  { text: "12800" },
];

const shtOptions = [
  { text: "45°", value: "45" },
  { text: "90°", value: "90" },
  { text: "144°", value: "144" },
  { text: "180°", value: "180" },
  { text: "270°", value: "270" },
  { text: "360°", value: "360" },
];

const onChange = (index) => {
  switch (index) {
    case 0:
      options.value = fpsOptions;
      isShow.value = true;
      isShowGain.value = false;
      break;
    case 1:
      options.value = isoOptions;
      isShow.value = true;
      isShowGain.value = false;
      break;
    case 2:
      options.value = shtOptions;
      isShow.value = true;
      isShowGain.value = false;
      break;
    case 3:
      isShowGain.value = true;
      isShow.value = false;
      break;
    case 4:
      options.value = zoomOptions;
      isShow.value = true;
      isShowGain.value = false;
      break;
  }
};

const record = () => {
  if (isRecording.value === "0") {
    isRecording.value = "1";
  } else {
    isRecording.value = "0";
  }
  websocket.send(
    JSON.stringify({
      msgType: "is_recording",
      msgDetail: isRecording.value,
    }),
  );
};

const changeValue = (v) => {
  switch (active.value) {
    case 0:
      fps.value = v.currentOption.text;
      websocket.send(
        JSON.stringify({
          msgType: "fps",
          msgDetail: fps.value,
        }),
      );
      break;
    case 1:
      iso.value = v.currentOption.text;
      websocket.send(
        JSON.stringify({
          msgType: "iso",
          msgDetail: iso.value,
        }),
      );
      break;
    case 2:
      sht.value = v.currentOption.value;
      websocket.send(
        JSON.stringify({
          msgType: "sht",
          msgDetail: sht.value,
        }),
      );
      break;
    case 4:
      zoom.value = v.currentOption.value;
      websocket.send(
        JSON.stringify({
          msgType: "lv_zoom",
          msgDetail: zoom.value,
        }),
      );
      break;
  }
};

const changeCG = (v) => {
  websocket.send(
    JSON.stringify({
      msgType: "cg_rb",
      msgDetail: `${redGainShow.value},${blueGainShow.value}`,
    }),
  );
  if (awb.value === true) {
    websocket.send(
      JSON.stringify({
        msgType: "awb",
        msgDetail: 0 + "",
      }),
    );
    awb.value = false;
  }
};

const changeAWB = (v) => {
  if (v) {
    websocket.send(
      JSON.stringify({
        msgType: "awb",
        msgDetail: 1 + "",
      }),
    );
  } else {
    websocket.send(
      JSON.stringify({
        msgType: "awb",
        msgDetail: 0 + "",
      }),
    );
  }
};

const mouseup = (e) => {
  isShow.value = false;
  isShowGain.value = false;
  active.value = -1;
};

const wsOnmessage = (message) => {
  switch (JSON.parse(message.data).msgType) {
    case "cg_rb":
      let gain = JSON.parse(message.data).msgDetail.split(",");
      redGain.value = parseInt(parseFloat(gain[0]) * 10);
      blueGain.value = parseInt(parseFloat(gain[1]) * 10);
      break;
    case "awb":
      awb.value = JSON.parse(message.data).msgDetail === "1";
      break;
    case "fps":
      fps.value = JSON.parse(message.data).msgDetail;
      break;
    case "iso":
      iso.value = JSON.parse(message.data).msgDetail;
      break;
    case "sht":
      sht.value = JSON.parse(message.data).msgDetail;
      break;
    case "cpu":
      cpu.value = JSON.parse(message.data).msgDetail;
      break;
    case "cpuTem":
      cpuTem.value = JSON.parse(message.data).msgDetail;
      break;
    case "sensor":
      sensor.value = JSON.parse(message.data).msgDetail;
      break;
    case "is_recording":
      isRecording.value = JSON.parse(message.data).msgDetail;
      break;
    case "ssd":
      ssd.value = parseInt(JSON.parse(message.data).msgDetail);
      break;
    case "lv_zoom":
      zoom.value = JSON.parse(message.data).msgDetail;
      break;
    case "list":
      list.value = JSON.parse(JSON.parse(message.data).msgDetail);
      break;
  }
};

const getList = () => {
  showLeft.value = true;
  websocket.send(
    JSON.stringify({
      msgType: "list",
      msgDetail: "",
    }),
  );
};

const openDialog = (oldName) => {
  renameMsg.value.oldName = oldName;
  isShowDialog.value = true;
};

const openDeleteDialog = (name) => {
  deleteName.value = name;
  isShowDeleteDialog.value = true;
};

const renameFile = () => {
  websocket.send(
    JSON.stringify({
      msgType: "rename",
      msgDetail: JSON.stringify(renameMsg.value),
    }),
  );
  showNotify({ type: "success", message: "Rename File success!" });
  isShowDialog.value = false;
};

const deleteFile = () => {
  websocket.send(
    JSON.stringify({
      msgType: "delete",
      msgDetail: deleteName.value,
    }),
  );
  showNotify({ type: "success", message: "Delete File success!" });
  isShowDeleteDialog.value = false;
};

const unmount = () => {
  websocket.send(
    JSON.stringify({
      msgType: "unmount",
      msgDetail: "",
    }),
  );
  showNotify({ type: "success", message: "Unmount CFE-card success!" });
};

const startWebSocket = () => {
  if ("WebSocket" in window) {
    websocket = new WebSocket(`ws://${host}:5678/control`);
    websocket.onmessage = wsOnmessage;
    websocket.onclose = (e) => {
      isConnected.value = false;
    };
    websocket.onopen = (e) => {
      isConnected.value = true;
      showNotify({ type: "success", message: "Connected success!" });
    };
  }
};

const wsPreviewOnmessage = (message) => {
  hasImg.value = true;
  const blob = new Blob([message.data], { type: "image/jpeg" });
  const URL = window.URL || window.webkitURL;
  const img = new Image();
  const canvas = document.getElementById("canvas");
  const g = canvas.getContext("2d");
  img.onload = function () {
    const { width } = img;
    const { height } = img;
    canvas.width = width;
    canvas.height = height;
    g.drawImage(img, 0, 0, width, height);
  };
  const u = URL.createObjectURL(blob);
  img.src = u;
};

const closePreview = () => {
  if (previewWebsocket !== null) {
    previewWebsocket.close();
  }
  isShowCanvas.value = false;
  const canvas = document.getElementById("canvas");
  const g = canvas.getContext("2d");
  g.clearRect(0, 0, canvas.width, canvas.height);
};

const startPreviewWebSocket = (file) => {
  isShowCanvas.value = true;
  showLeft.value = false;
  hasImg.value = false;
  if (previewWebsocket !== null) {
    previewWebsocket.close();
  }
  if ("WebSocket" in window) {
    previewWebsocket = new WebSocket(`ws://${host}:5678/preview/${file}`);
    previewWebsocket.onmessage = wsPreviewOnmessage;
    previewWebsocket.onclose = (e) => {
      showNotify({ type: "success", message: "Preview finish!" });
    };
    previewWebsocket.onopen = (e) => {};
  }
};

onMounted(() => {
  startWebSocket();
});

onBeforeUnmount(() => {
  if (websocket !== null) {
    websocket.close();
  }
  if (previewWebsocket !== null) {
    previewWebsocket.close();
  }
});
</script>

<template>
  <van-overlay v-model:show="isShowCanvas" @click="closePreview" z-index="1999">
    <div class="wrapper">
      <div class="block">
        <div
          class="fox-font"
          v-if="!hasImg"
          style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100%;
          "
        >
          Waiting...
        </div>
        <canvas
          id="canvas"
          style="display: inline-block; width: 100%; height: 100%"
        />
      </div>
    </div>
  </van-overlay>
  <van-dialog
    v-model:show="isShowDialog"
    title="Rename File"
    show-cancel-button
    confirm-button-text="Confirm"
    cancel-button-text="Cancel"
    @confirm="renameFile"
  >
    <van-cell-group inset>
      <van-field
        v-model="renameMsg.newName"
        label="New Name"
        placeholder="Please type new file name here"
      />
    </van-cell-group>
  </van-dialog>

  <van-dialog
    v-model:show="isShowDeleteDialog"
    title="Delete File"
    message="The files cannot be restored after being deleted, please confirm it!"
    confirm-button-text="Confirm"
    cancel-button-text="Cancel"
    show-cancel-button
    @confirm="deleteFile"
  >
  </van-dialog>

  <van-popup
    v-model:show="showLeft"
    position="left"
    :style="{ width: '70%', height: '100%', textAlign: 'center' }"
  >
    <div style="position: relative">
      <h2 style="color: var(--van-gray-5)">FILES</h2>
      <div style="position: absolute; right: 10px; top: 2vh">
        <van-icon
          @click="getList"
          name="replay"
          size="8vh"
          style="color: var(--van-success-color)"
        />
        <van-icon
          @click="unmount"
          name="exchange"
          size="8vh"
          style="color: var(--van-danger-color); margin-left: 10px"
        />
      </div>
      <van-list finished-text="no more files">
        <van-cell
          class="fox-font"
          v-for="item in list"
          :key="item"
          :title="item"
        >
          <template #title>
            {{ item }}
          </template>
          <template #right-icon>
            <div class="fox-center">
              <van-icon
                size="5vh"
                style="color: var(--van-primary-color)"
                name="play-circle"
                @click="startPreviewWebSocket(item)"
              />
              <van-icon
                size="5vh"
                style="margin-left: 10px; color: var(--van-primary-color)"
                name="edit"
                @click="openDialog(item)"
              />
              <van-icon
                size="5vh"
                style="margin-left: 10px; color: var(--van-danger-color)"
                name="delete-o"
                @click="openDeleteDialog(item)"
              />
            </div>
          </template>
        </van-cell>
      </van-list>
    </div>
  </van-popup>

  <div class="fox-global">
    <div class="fix-panel">
      <div class="fox-panel-item-left" style="height: 15vh">
        <img src="/logo.png" alt="" style="height: 14vh" />
      </div>
      <div class="fox-panel-item-left" style="height: 20vh">
        <div>
          <div
            class="fox-font fox-center"
            :style="
              cpu < 60
                ? cpu < 30
                  ? 'color:var(--van-success-color)'
                  : 'color:var(--van-warning-color)'
                : 'color:var(--van-danger-color)'
            "
          >
            <img
              src="/usage.png"
              style="width: 5vh; margin-right: 3px"
              alt=""
            />
            <span>{{ cpu }}</span>
            <span style="font-size: 3vh">%</span>
          </div>
          <div
            class="fox-font fox-center"
            style="margin-top: 3vh"
            :style="
              cpuTem < 20
                ? cpuTem < 30
                  ? 'color:var(--van-success-color)'
                  : 'color:var(--van-warning-color)'
                : 'color:var(--van-danger-color)'
            "
          >
            <img src="/tem.png" style="width: 5vh" alt="" />
            <span>{{ cpuTem }}</span>
            <span style="font-size: 3vh">℃</span>
          </div>
        </div>
      </div>

      <div class="fox-panel-item-left" style="height: 10vh">
        <van-tag color="#7232dd">{{ sensor }}</van-tag>
      </div>

      <div class="fox-panel-item-left" style="height: 25vh">
        <div>
          <van-switch size="22px" v-model="enableCross">
            <template #node>
              <div class="icon-wrapper">
                <van-icon
                  name="plus"
                  :style="
                    enableCross
                      ? 'color: var(--van-blue)'
                      : 'color: var(--van-gray-5)'
                  "
                />
              </div>
            </template>
          </van-switch>
          <van-switch size="22px" style="margin-top: 10px" v-model="enableLine">
            <template #node>
              <div class="icon-wrapper">
                <van-icon
                  name="enlarge"
                  :style="
                    enableLine
                      ? 'color: var(--van-blue)'
                      : 'color: var(--van-gray-5)'
                  "
                />
              </div>
            </template>
          </van-switch>
        </div>
      </div>

      <div class="fox-panel-item-left" style="height: 20vh" @click="getList">
        <van-circle
          v-model:current-rate="currentSSD"
          :color="
            ssd < 70
              ? ssd < 40
                ? 'var(--van-success-color)'
                : 'var(--van-warning-color)'
              : 'var(--van-danger-color)'
          "
          layer-color="#000000"
          :rate="ssd"
          :clockwise="false"
          :stroke-width="100"
          :speed="100"
          :text="ssd + '%'"
          size="15vh"
        />
      </div>

      <div class="fox-panel-item-left" style="height: 10vh">
        <van-icon
          name="eye-o"
          :style="
            enableLine ? 'color: var(--van-blue)' : 'color: var(--van-gray-5)'
          "
        />

        <van-icon
          name="chart-trending-o"
          :style="
            enableLine ? 'color: var(--van-blue)' : 'color: var(--van-gray-5)'
          "
        />
      </div>
    </div>
    <div class="fox-center" style="position: relative">
      <div
        class="blinking fox-center fox-rec-layout"
        v-if="isRecording === '1'"
      >
        <span class="fox-rec-font">REC</span>
      </div>
      <div class="image-container fox-center">
        <img
          v-if="!isConnected"
          @mouseup="mouseup"
          src="/banner.png"
          style="height: auto; width: 100%"
          alt=""
        />
        <img
          v-else
          @mouseup="mouseup"
          :src="`http://${host}:8000/stream`"
          style="height: auto; width: 100%"
          alt=""
        />
        <div class="crosshair" v-if="enableCross"></div>
        <div class="overlay" v-if="enableLine">
          <div class="grid">
            <div class="row">
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
            </div>
            <div class="row">
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
            </div>
            <div class="row">
              <div class="cell"></div>
              <div class="cell"></div>
              <div class="cell"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="fox-picker">
        <div class="fox-gain" v-if="isShowGain">
          <div class="fox-center" style="height: 180px">
            <van-slider
              :disabled="awb === true"
              @change="changeCG"
              reverse
              max="50"
              min="0"
              bar-height="2vh"
              v-model="redGain"
              vertical
              active-color="var(--van-danger-color)"
            >
              <template #button>
                <div class="custom-button-red">{{ redGainShow }}</div>
              </template>
            </van-slider>
            <van-slider
              :disabled="awb === true"
              @change="changeCG"
              reverse
              max="50"
              min="0"
              bar-height="2vh"
              style="margin-left: 12vh"
              v-model="blueGain"
              vertical
              active-color="var(--van-primary-color)"
            >
              <template #button>
                <div class="custom-button-blue">{{ blueGainShow }}</div>
              </template>
            </van-slider>
          </div>
          <div style="text-align: center; margin-top: 10px">
            <div class="fox-font-2">AWB</div>
            <van-switch
              size="22px"
              style="margin-top: 5px"
              v-model="awb"
              @change="changeAWB"
            />
          </div>
        </div>
        <van-picker
          v-if="isShow"
          :columns="options"
          @scroll-into="changeValue"
          confirm-button-text=""
          cancel-button-text=""
          :option-height="50"
          :show-toolbar="false"
          :visible-option-num="5"
        />
      </div>
    </div>
    <div class="fix-panel">
      <van-sidebar v-model="active" @change="onChange">
        <div class="fox-panel-item">
          <van-sidebar-item>
            <template #title>
              <div class="fox-font-2">FPS</div>
              <div style="margin-top: 2vh">
                {{ fps }}
              </div>
            </template>
          </van-sidebar-item>
        </div>
        <div class="fox-panel-item">
          <van-sidebar-item>
            <template #title>
              <div class="fox-font-2">ISO</div>
              <div style="margin-top: 2vh">
                {{ iso }}
              </div>
            </template>
          </van-sidebar-item>
        </div>
        <div class="fox-panel-item">
          <van-sidebar-item>
            <template #title>
              <div class="fox-font-2">SHT</div>
              <div style="margin-top: 2vh">{{ sht }}°</div>
            </template>
          </van-sidebar-item>
        </div>
        <div class="fox-panel-item">
          <van-sidebar-item>
            <template #title>
              <div class="fox-font-2">COLOR</div>
              <div style="margin-top: 2vh; font-size: 4vh">
                {{ redGainShow }}/{{ blueGainShow }}
              </div>
            </template>
          </van-sidebar-item>
        </div>
        <div class="fox-panel-item">
          <van-sidebar-item>
            <template #title>
              <div class="fox-font-2">ZOOM</div>
              <div style="margin-top: 2vh">{{ zoom.replace(".0", "") }}x</div>
            </template>
          </van-sidebar-item>
        </div>
        <div class="fox-panel-item" @click="record">
          <van-icon
            v-if="isRecording === '1'"
            name="stop"
            size="15vh"
            style="color: var(--van-danger-color)"
          />
          <van-icon
            v-else
            name="circle"
            size="15vh"
            style="color: var(--van-success-color)"
          />
        </div>
      </van-sidebar>
    </div>
  </div>
</template>
<style>
body {
  background-color: var(--van-background);
}

.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.block {
  width: auto;
  height: 90%;
  background-color: #fff;
}

.fox-rec-layout {
  position: absolute;
  left: 3vh;
  top: 2vh;
  z-index: 100;
}

.fox-rec-font {
  font-family: Geneva, Tahoma, Verdana, sans-serif;
  color: var(--van-danger-color);
  font-size: 9vh;
}

.fox-status-font {
  font-family: Geneva, Tahoma, Verdana, sans-serif;
  color: #ffffff;
  margin-right: 10px;
  font-size: 5vh;
}

.fox-global {
  display: flex;
  width: 100%;
  height: 100vh;
}

.fix-panel {
  min-width: 20vh;
  max-width: 20vh;
  text-align: center;
  position: relative;
}

.fox-picker {
  position: absolute;
  right: 2vh;
  min-width: 40vh;
}

.fox-center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.fox-gain {
  padding: 5vh 5vh;
  background-color: rgba(0, 0, 0, 0.7);
}

.fox-font {
  font-family: Geneva, Tahoma, Verdana, sans-serif;
  font-size: 5vh;
  color: var(--van-gray-5);
}

.fox-font-2 {
  font-family: Geneva, Tahoma, Verdana, sans-serif;
  font-size: 4vh;
  color: var(--van-gray-5);
}

:root:root {
  --van-divider-margin: 5px 0;
  --van-picker-background: rgba(0, 0, 0, 0.7);
  --van-picker-option-text-color: var(--van-gray-5);
  --van-picker-option-font-size: 7vh;
  --van-sidebar-selected-border-color: var(--van-warning-color);
  --van-sidebar-width: 100%;
  --van-sidebar-selected-font-weight: 0;
  --van-sidebar-font-size: 5vh;
  --van-sidebar-padding: 0px 10px;
  --van-sidebar-text-color: #ffffff;
}

@keyframes blink {
  0% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}

.blinking {
  animation: blink 1s infinite;
}

.image-container {
  position: relative;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.grid {
  width: 100%;
  height: 100%;
}

.row {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  height: 33.4%;
}

.cell {
  width: 33.4%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.5);
}

.custom-button-red {
  width: 8vh;
  color: #fff;
  font-size: 3vh;
  line-height: 5vh;
  text-align: center;
  background-color: var(--van-danger-color);
  border-radius: 100px;
}

.custom-button-blue {
  width: 8vh;
  color: #fff;
  font-size: 3vh;
  line-height: 5vh;
  text-align: center;
  background-color: var(--van-primary-color);
  border-radius: 100px;
}

.fox-panel-item {
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.3);
  height: 16.6vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.fox-panel-item-left {
  box-sizing: border-box;
  border: 1px solid rgba(255, 255, 255, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.crosshair {
  width: 20px;
  height: 20px;
}
.crosshair::before,
.crosshair::after {
  content: "";
  position: absolute;
  width: 50px;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.5);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.crosshair::after {
  height: 50px;
  width: 2px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.icon-wrapper {
  font-size: 20px;
}
</style>
