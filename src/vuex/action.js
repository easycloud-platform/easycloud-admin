import * as api from '../axios/api'

// export const setTestNo = function ({commit, state}, testNo) {
//   commit('SET_TEST_NO', testNo)
// }

// // 面包屑导航
// export const setBreadcrumbList = function ({ commit, state }, breadcrumbList) {
// 	commit('SET_BREADCRUMB_LIST', breadcrumbList)
// }

export const setCurrentProcedure = function ({ commit, state }, currentProcedure) {
  commit('SET_CURRENT_PROCEDURE', currentProcedure)
}

export const setSearchMenu2Show = function ({ commit, state }, searchMenu2Show) {
  commit('SET_SEARCH_MENU2SHOW', searchMenu2Show)
}

export const setCaseNo = function ({ commit, state }, caseNo) {
  commit('SET_CASE_NO', caseNo)
}

export const setMaterialId = function ({ commit, state }, materailId) {
  commit('SET_MATERIAL_ID', materailId)
}

export const setCurrentMenu = function ({ commit, state }, currentMenu) {
  commit('SET_CURRENT_MENU', materailId)
}

export const setEditDocuments = function ({ commit, state }, editDocuments) {
  commit('SET_EDIT_DOCUMENTS', editDocuments)
}
// export function setUserId (context,currentUserId) {
//	context.commit('SET_USERID',currentUserId)
// }




// export const setDossierList = function ({commit, state}, {dossierId, currentFolder, type}) {
//   if (currentFolder === false || type == null) {
//     commit('SET_DOSSIER_LIST', []);
//     return;
//   }
//   let params = {dossierId: dossierId, id: currentFolder, type: type};
//   api.findFileInfo(params)
//     .then(res => {
//       if (res.data.code == "0") {
//         if (!res.data.data) {
//           commit('SET_DOSSIER_LIST', []);
//         }
//         else {
//           commit('SET_DOSSIER_LIST', Util.formatDossierList(res.data.data));
//         }
//       }
//       commit('SET_CHECK_LIST', {type: null, children: [], allNum: 0});
//     });
// };
