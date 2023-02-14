/**
 * @name NoImageGroups
 * @author KaydaCant
 * @description A simple BetterDiscord plugin that reverts the Discord message attachments to their old display.
 * @version 1.0.0
 */

module.exports = class NoImageGroups {
    constructor(meta) {
        this.interval = null;
    }

    start() {
        BdApi.injectCSS("NoImageGroups", `
        .imageMarginTop {
            margin-top: 8px !important;
        }

        .lazyImg-ewiNCh {
            max-height: 100% !important;
        }

        .oneByOneGrid-3Cl27N {
            max-height: 100% !important;
            width: 50% !important;
        }
        `);

        this.interval = setInterval(() => {
            let grids = document.querySelectorAll(".mediaAttachmentsContainer-1WGRWy > *:not(.oneByOneGrid-3Cl27N)");
            for (var i = 0; i < grids.length; i++) {
                let images = grids[i].querySelectorAll("* > * > .messageAttachment-CZp8Iv");
                for (var x = 0; x < images.length; x++) {
                    let parent = grids[i].parentNode;
                    let element = document.createElement("div");
                    element.setAttribute("class", "oneByOneGrid-3Cl27N oneByOneGridSingle-2ss-Zx imageMarginTop");
                    element.appendChild(images[x]);
                    parent.appendChild(element);
                }
                grids[i].remove()
            }
        }, 500)
    } 

    stop() {
        clearInterval(this.interval);
    }
}