import { toPng } from "html-to-image";

export async function downloadPng(node: HTMLElement, filename = "faketext.png") {
  const dataUrl = await toPng(node, {
    pixelRatio: 3,
    cacheBust: true,
    backgroundColor: getComputedStyle(node).backgroundColor || "#ffffff",
  });
  const a = document.createElement("a");
  a.href = dataUrl;
  a.download = filename;
  a.click();
}

export async function copyPng(node: HTMLElement) {
  const dataUrl = await toPng(node, { pixelRatio: 3, cacheBust: true });
  const blob = await (await fetch(dataUrl)).blob();
  // @ts-ignore
  if (navigator.clipboard && window.ClipboardItem) {
    // @ts-ignore
    await navigator.clipboard.write([new ClipboardItem({ "image/png": blob })]);
    return true;
  }
  return false;
}
