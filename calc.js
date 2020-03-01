// タグ素材
// 表の左側START
const trtd1 = "<tr><td>";
// 表の左側END、表の右側START
const trtd2 = "</td><td>";
// 表の右側END
const trtd3 = "</td></tr>";
// URLSTART1
const urlStart = "<a href=\"";
// URLSTART2(スキル用)
const url2 = "\">";
// URLSTART3(アーク用)
const url3 = "\" target=\"_blank\">";
// URLSTART
const urlEnd = "</a>";
// 改行コード
const newLine = "<br>";
// チェック外すボタンSTART
const checked1 = "<input type=\"button\" value=\"外す\" id=\""
// チェック外すボタンEND
const checked2 = "\" onclick=\"disCheck(this);\">"

// チェックしたスキルを一覧に追加＆情報取得
function calc(){
	// リスト素材
	// スキルリンク用ID
	var skId = "";
	// スキル名
	var skill = "";
	// 取得可能アーク
	var arc = "";
	// アークURL
	var arcUrl = "";
	// スキル名(コピー用)
	var skillName = "";
	// スキルコスト合計
	var allSc = 0;
	// 一覧用リスト
	var selectList = [];
	// ユニット選択リスト
	var skillTable = [];
	// コピー用リスト
	var copyList = [];
	const sc = document.scCalc;

	for (let i = 0; i < sc.length; i++){
		if(sc[i].checked){
			// スキル情報を取得
			skill = getSkill(sc[i].value);
			// アーク情報を取得
			arc = getArc(sc[i].value);
			// スキル名(コピー用)を取得
			skillName = getSkillName(sc[i].value);
			// table用タグ生成
			var checkList = trtd1 + skill + trtd2 + arc + trtd2 + checked1 + sc[i].value + checked2;
			// 一覧用リストに追加
			selectList.push(checkList);
			// コピー用リストに追加
			copyList.push(skillName);
			// 合計値を追加
			allSc += getSc(sc[i].value);
		}
	}
	document.getElementById("checkList").innerHTML = selectList.join(trtd3);
	document.getElementById("copyList").textContent = copyList.join("\r\n");
	document.getElementById("result").textContent = allSc;
}

// スキル名＆IDを取得
function getSkill(listKey){
	var idKey = eval(`skillList.${listKey}[0].id`);
	var skillKey = eval(`skillList.${listKey}[0].skill`);
	var scKey = eval(`skillList.${listKey}[0].sc`);
	return urlStart + idKey + url2 + skillKey + urlEnd + newLine + scKey;
}

// アーク情報の取得
function getArc(listKey){
	var urlList = "";
	var arcList = "";
	var lvList = "";
	var arcArr = eval(`skillList.${listKey}[1]["arc"]`);
	var lvArr = eval(`skillList.${listKey}[1]["lv"]`);

	for (var i = 0; i < arcArr.length; i++) {
		arcList = eval(`arcData.${arcArr[i]}`);
		lvList = getArcLv(lvArr[i]);
			urlList += urlStart + arcList[1] + url3 + arcList[0] + lvList + urlEnd + newLine;
	}
	return urlList;
}

// 取得可能なアークLVを取得
function getArcLv(lv){
	switch (lv) {
		case 1:
		arcLv = "(LV1)";
		break;
		case 2:
		arcLv = "(LV2)";
		break;
		case 3:
		arcLv = "(LV3)";
		break;
		case 4:
		arcLv = "(LV4)";
		break;
		case 5:
		arcLv = "(LV5)";
		break;
		case 6:
		arcLv = "(LV6)";
		break;
		case 7:
		arcLv = "(LV7)";
		break;
		case 8:
		arcLv = "(LV8)";
		break;
		case 9:
		arcLv = "(LV9)";
		break;
		default:
		arcLv = "(LV10)";
	}
	return arcLv;
}

// SC値取得
function getSc(listKey) {
	var scValue = eval(`skillList.${listKey}[0].sc`);
	var cost = 0;
	switch (scValue) {
		case "SC:1":
			cost++;
		break;
		case "SC:2":
			cost += 2;
		break;
		case "SC:3":
			cost += 3;
		break;
		case "SC:4":
			cost += 4;
		break;
		case "SC:5":
			cost += 5;
		break;
		case "SC:6":
			cost += 6;
		break;
		case "SC:7":
			cost += 7;
		break;
		case "SC:8":
			cost += 8;
		break;
		case "SC:9":
			cost += 9;
		break;
		case "SC:10":
			cost += 10;
		break;
		case "SC:11":
			cost += 11;
		break;
		case "SC:12":
			cost += 12;
		break;
		case "SC:14":
			cost += 14;
		break;
		case "SC:15":
			cost += 15;
		break;
		default:
	}
	return cost;
}

// スキル名(コピー用)を取得
function getSkillName(listKey){
	var skillName = eval(`skillList.${listKey}[0].skill`);
	return skillName;
}

// 選択したスキルのチェックを外す
function disCheck(ele){
	var name = ele.id;
	const sc = document.scCalc;
	for (let i = 0; i < sc.length; i++){
		if(name === sc[i].name){sc[i].checked = false;}
	}
	calc();
}

// 全てのチェックを外す
function allDisCheck(){
	const sc = document.scCalc;
	for (var i = 0; i < sc.length; i++){sc[i].checked = false;}
	document.getElementById("result").textContent = 0;
	document.getElementById("checkList").innerHTML = "";
	document.getElementById("copyList").innerHTML = "";
}

function selectUnit(){
	// formの全情報を取得
	const allData = document.forms.scCalc;

	var skNameList = getUnitSkill(allData);
	if (skNameList == null) {
		// すべてのスキルを一度活性化
		skillEnable(allData);
		skillTable = [];
		document.getElementById("checkList").innerHTML = skillTable;
		allDisCheck();
	}else{
		// すべてのスキルを一度活性化
		skillEnable(allData);
		// ユニットが取得するスキルを非活性化
		skillDisabled(allData,skNameList);
		// ユニットが取得するスキルの一覧を取得
		skillTable = [];
		for (var index6 = 0; index6 < skNameList.length; index6++) {
			skillTable.push(trtd1 + eval(`skillList.${skNameList[index6]}[0].skill`));
		}
		document.getElementById("skillTable").innerHTML = skillTable.join(trtd3);
		allDisCheck();
	}
}

// すべてのスキルを活性化
function skillEnable(allData){
	// checkboxを活性化
	for (var index1 = 0; index1 < allData.length; index1++) {
		if (allData[index1].type == "checkbox") {
			allData[index1].disabled = false;
		}
	}
	// スキル項目を元の色に戻す
	var skill = allData.children;
	var tbody;
	for (var index2 = 0; index2 < skill.length; index2++) {
		if (skill[index2].firstElementChild != null) {
			// tbody部分を取得
			tbody = skill[index2].firstElementChild.children;
			for (var index3 = 0; index3 < tbody.length; index3++) {
				tbody[index3].bgColor = "";
			}
		}
	}
}

// 取得したスキルと一致するCHECKBOXを非活性して項目をグレーアウト
function skillDisabled(allData,skNameList){
	// formの1段落目にある全タグ情報を取得
	var parag = allData.children;
	var tbody;
	var td;
	var checkboxName;
	for (var index4 = 0; index4 < skNameList.length; index4++) {
		if (eval(`skillList.${skNameList[index4]}[0].sc`) != "SC:-"){
			eval(`allData.${skNameList[index4]}.disabled = true`);
			// 非活性にしたcheckboxのname属性を取得
			checkboxName = eval(`allData.${skNameList[index4]}`).name;
			for (var index5 = 0; index5 < parag.length; index5++) {
				if (parag[index5].firstElementChild != null) {
					// tbody部分を取得
					tbody = parag[index5].firstElementChild.children;
					for (var index5 = 0; index5 < tbody.length; index5++) {
						// tbody内のtd部分を取得
						td = tbody[index5].children[0]
						// td部分にid情報があるものだけ取得
						if (td.id != "") {
							// 非活性にしたcheckboxのname属性と
							// td部分にid情報が一致する項目だけグレーアウトにする
							if (checkboxName == td.id) {
								tbody[index5].bgColor = "#c0c0c0";
								tbody[index5+1].bgColor = "#c0c0c0";
							}
						}
					}
				}
			}
		}
	}
}

// ユニットのスキル情報を取得
function getUnitSkill(allData){
	var select = allData.unit;
  var index = select.selectedIndex;
  // if (index != 0){
  // }
	switch (select.options[index].value) {
		case "uni001":
		return  unitSkillList.uni001;
		break;
		case "uni002":
		return  unitSkillList.uni002;
		break;
		case "uni003":
		return  unitSkillList.uni003;
		break;
		case "uni004":
		return  unitSkillList.uni004;
		break;
		case "uni005":
		return  unitSkillList.uni005;
		break;
		case "uni006":
		return  unitSkillList.uni006;
		break;
		case "uni007":
		return  unitSkillList.uni007;
		break;
		case "uni008":
		return  unitSkillList.uni008;
		break;
		case "uni009":
		return  unitSkillList.uni009;
		break;
		case "uni010":
		return  unitSkillList.uni010;
		break;
		case "uni011":
		return  unitSkillList.uni011;
		break;
		case "uni012":
		return  unitSkillList.uni012;
		break;
		case "uni013":
		return  unitSkillList.uni013;
		break;
		case "uni014":
		return  unitSkillList.uni014;
		break;
		case "uni015":
		return  unitSkillList.uni015;
		break;
		case "uni016":
		return  unitSkillList.uni016;
		break;
		case "uni017":
		return  unitSkillList.uni017;
		break;
		case "uni028":
		return  unitSkillList.uni028;
		break;
		case "uni029":
		return  unitSkillList.uni029;
		break;
		case "uni030":
		return  unitSkillList.uni030;
		break;
		case "uni031":
		return  unitSkillList.uni031;
		break;
		case "uni032":
		return  unitSkillList.uni032;
		break;
		case "uni033":
		return  unitSkillList.uni033;
		break;
		case "uni034":
		return  unitSkillList.uni034;
		break;
		case "uni035":
		return  unitSkillList.uni035;
		break;
		case "uni036":
		return  unitSkillList.uni036;
		break;
		case "uni037":
		return  unitSkillList.uni037;
		break;
		case "uni038":
		return  unitSkillList.uni038;
		break;
		case "uni039":
		return  unitSkillList.uni039;
		break;
		case "uni040":
		return  unitSkillList.uni040;
		break;
		case "uni041":
		return  unitSkillList.uni041;
		break;
		case "uni042":
		return  unitSkillList.uni042;
		break;
		case "uni043":
		return  unitSkillList.uni043;
		break;
		case "uni044":
		return  unitSkillList.uni044;
		break;
		case "uni045":
		return  unitSkillList.uni045;
		break;
		case "uni046":
		return  unitSkillList.uni046;
		break;
		case "uni047":
		return  unitSkillList.uni047;
		break;
		case "uni048":
		return  unitSkillList.uni048;
		break;
		case "uni049":
		return  unitSkillList.uni049;
		break;
		case "uni050":
		return  unitSkillList.uni050;
		break;
		case "uni018":
		return  unitSkillList.uni018;
		break;
		case "uni019":
		return  unitSkillList.uni019;
		break;
		case "uni020":
		return  unitSkillList.uni020;
		break;
		case "uni021":
		return  unitSkillList.uni021;
		break;
		case "uni022":
		return  unitSkillList.uni022;
		break;
		case "uni023":
		return  unitSkillList.uni023;
		break;
		case "uni024":
		return  unitSkillList.uni024;
		break;
		case "uni025":
		return  unitSkillList.uni025;
		break;
		case "uni026":
		return  unitSkillList.uni026;
		break;
		case "uni027":
		return  unitSkillList.uni027;
		break;
		default:
		return null;
	}
}

// スキル一覧
const skillList = {
	"sk001" : [{"id":"#sk001","skill":"ヒール","sc":"SC:1"},{"arc":["a076","a068"],"lv":[2,1]}]
	,"sk002" : [{"id":"#sk002","skill":"キュアポイズン","sc":"SC:1"},{"arc":["a068","a078"],"lv":[1,1]}]
	,"sk003" : [{"id":"#sk003","skill":"キュアダーク","sc":"SC:1"},{"arc":["a063"],"lv":[1]}]
	,"sk004" : [{"id":"#sk004","skill":"リジェネ","sc":"SC:2"},{"arc":["a078","a045","a048"],"lv":[1,1,1]}]
	,"sk005" : [{"id":"#sk005","skill":"キュアサイレンス","sc":"SC:2"},{"arc":["a059"],"lv":[2]}]
	,"sk006" : [{"id":"#sk006","skill":"キュアカーズ","sc":"SC:2"},{"arc":["a063"],"lv":[4]}]
	,"sk007" : [{"id":"#sk007","skill":"ヒールウィンド","sc":"SC:3"},{"arc":["a068","a039","a043"],"lv":[4,1,1]}]
	,"sk008" : [{"id":"#sk008","skill":"キュアウィルス","sc":"SC:3"},{"arc":["a078","a075"],"lv":[4,1]}]
	,"sk009" : [{"id":"#sk009","skill":"キュアパラライズ","sc":"SC:3"},{"arc":["a078"],"lv":[5]}]
	,"sk010" : [{"id":"#sk010","skill":"スターヒール","sc":"SC:4"},{"arc":["a039","a048","a009"],"lv":[4,6,1]}]
	,"sk011" : [{"id":"#sk011","skill":"マキュアポイズン","sc":"SC:5"},{"arc":["a027"],"lv":[1]}]
	,"sk012" : [{"id":"#sk012","skill":"マキュアダーク","sc":"SC:5"},{"arc":["a042","a020"],"lv":[3,3]}]
	,"sk013" : [{"id":"#sk013","skill":"リザレクション","sc":"SC:5"},{"arc":["a068","a048"],"lv":[8,4]}]
	,"sk014" : [{"id":"#sk014","skill":"ハイリジェネ","sc":"SC:4"},{"arc":["a027","a050"],"lv":[1,5]}]
	,"sk015" : [{"id":"#sk015","skill":"マキュアサイレンス","sc":"SC:5"},{"arc":["a051","a029"],"lv":[1,3]}]
	,"sk016" : [{"id":"#sk016","skill":"マキュアカーズ","sc":"SC:5"},{"arc":["a046"],"lv":[5]}]
	,"sk017" : [{"id":"#sk017","skill":"スターダストヒール","sc":"SC:6"},{"arc":["a039","a011"],"lv":[9,7]}]
	,"sk018" : [{"id":"#sk018","skill":"キュアオール","sc":"SC:6"},{"arc":["a027"],"lv":[5]}]
	,"sk019" : [{"id":"#sk019","skill":"グランドリジェネ","sc":"SC:6"},{"arc":["a078","a048"],"lv":[10,8]}]
	,"sk020" : [{"id":"#sk020","skill":"マキュアウィルス","sc":"SC:6"},{"arc":["a050"],"lv":[7]}]
	,"sk021" : [{"id":"#sk021","skill":"ゴッドヒール","sc":"SC:8"},{"arc":["a009"],"lv":[10]}]
	,"sk022" : [{"id":"#sk022","skill":"バーンストライク","sc":"SC:2"},{"arc":["a062","a076","a060","a041"],"lv":[1,1,1,1]}]
	,"sk023" : [{"id":"#sk023","skill":"アイスジャベリン","sc":"SC:2"},{"arc":["a076","a064","a060","a035"],"lv":[1,1,1,1]}]
	,"sk024" : [{"id":"#sk024","skill":"ロックディザスター","sc":"SC:2"},{"arc":["a076","a065"],"lv":[1,1]}]
	,"sk025" : [{"id":"#sk025","skill":"サンダーボルト","sc":"SC:2"},{"arc":["a060","a066","a073","a034"],"lv":[1,1,1,1]}]
	,"sk026" : [{"id":"#sk026","skill":"アストラルレイ","sc":"SC:3"},{"arc":["a063","a061","a057"],"lv":[2,1,1]}]
	,"sk027" : [{"id":"#sk027","skill":"シャドウグラビティ","sc":"SC:3"},{"arc":["a055","a031","a069"],"lv":[3,1,1]}]
	,"sk028" : [{"id":"#sk028","skill":"ポイズンクラウド","sc":"SC:5"},{"arc":["a053","a026"],"lv":[1,1]}]
	,"sk029" : [{"id":"#sk029","skill":"メテオレイン","sc":"SC:4"},{"arc":["a062","a041","a019"],"lv":[4,1,1]}]
	,"sk030" : [{"id":"#sk030","skill":"ブリザード","sc":"SC:4"},{"arc":["a064","a035","a018"],"lv":[4,2,1]}]
	,"sk031" : [{"id":"#sk031","skill":"トルネードストーム","sc":"SC:4"},{"arc":["a065","a073","a013"],"lv":[4,3,1]}]
	,"sk032" : [{"id":"#sk032","skill":"ライザーゲージ","sc":"SC:4"},{"arc":["a073","a034","a002"],"lv":[3,1,1]}]
	,"sk033" : [{"id":"#sk033","skill":"ギャラクシー","sc":"SC:5"},{"arc":["a042","a014"],"lv":[5,1]}]
	,"sk034" : [{"id":"#sk034","skill":"ダークマター","sc":"SC:5"},{"arc":["a031","a006"],"lv":[5,1]}]
	,"sk035" : [{"id":"#sk035","skill":"ベノムレインフォール","sc":"SC:8"},{"arc":["a026"],"lv":[6]}]
	,"sk036" : [{"id":"#sk036","skill":"クリムゾンフレア","sc":"SC:7"},{"arc":["a041"],"lv":[10]}]
	,"sk037" : [{"id":"#sk037","skill":"ダイヤモンドダスト","sc":"SC:7"},{"arc":["a035"],"lv":[9]}]
	,"sk038" : [{"id":"#sk038","skill":"グランドクロス","sc":"SC:7"},{"arc":["a013"],"lv":[7]}]
	,"sk039" : [{"id":"#sk039","skill":"ヴァルザライザー","sc":"SC:7"},{"arc":["a034"],"lv":[9]}]
	,"sk040" : [{"id":"#sk040","skill":"シャイニングゾーク","sc":"SC:10"},{"arc":["a014","a011"],"lv":[10,9]}]
	,"sk041" : [{"id":"#sk041","skill":"アビスゲート","sc":"SC:10"},{"arc":["a006"],"lv":[10]}]
	,"sk042" : [{"id":"#sk042","skill":"プロテクション","sc":"SC:1"},{"arc":["a067","a046"],"lv":[2,1]}]
	,"sk043" : [{"id":"#sk043","skill":"マジックバリア","sc":"SC:1"},{"arc":["a072","a065"],"lv":[2,1]}]
	,"sk044" : [{"id":"#sk044","skill":"ダークネス","sc":"SC:1"},{"arc":["a077","a033","a056"],"lv":[1,1,1]}]
	,"sk045" : [{"id":"#sk045","skill":"スピード","sc":"SC:1"},{"arc":["a079","a049"],"lv":[1,1]}]
	,"sk046" : [{"id":"#sk046","skill":"ブレイブ","sc":"SC:2"},{"arc":["a062","a028"],"lv":[2,1]}]
	,"sk047" : [{"id":"#sk047","skill":"オーラ","sc":"SC:2"},{"arc":["a079"],"lv":[2]}]
	,"sk048" : [{"id":"#sk048","skill":"リキャスト","sc":"SC:2"},{"arc":["a041","a049"],"lv":[1,1]}]
	,"sk049" : [{"id":"#sk049","skill":"クリティカル","sc":"SC:2"},{"arc":["a066"],"lv":[3]}]
	,"sk050" : [{"id":"#sk050","skill":"ブレイサー","sc":"SC:2"},{"arc":["a036"],"lv":[1]}]
	,"sk051" : [{"id":"#sk051","skill":"スイン","sc":"SC:2"},{"arc":["a064"],"lv":[2]}]
	,"sk052" : [{"id":"#sk052","skill":"ロストマ","sc":"SC:2"},{"arc":["a077","a069"],"lv":[2,2]}]
	,"sk053" : [{"id":"#sk053","skill":"ネメシス","sc":"SC:2"},{"arc":["a040","a037"],"lv":[1,1]}]
	,"sk054" : [{"id":"#sk054","skill":"サイレンス","sc":"SC:3"},{"arc":["a040","a036"],"lv":[1,1]}]
	,"sk055" : [{"id":"#sk055","skill":"カーズ","sc":"SC:3"},{"arc":["a077"],"lv":[4]}]
	,"sk056" : [{"id":"#sk056","skill":"ウィーク","sc":"SC:3"},{"arc":["a031","a037"],"lv":[1,2]}]
	,"sk057" : [{"id":"#sk057","skill":"ファイアウォール","sc":"SC:5"},{"arc":["a062"],"lv":[7]}]
	,"sk058" : [{"id":"#sk058","skill":"アイスウォール","sc":"SC:5"},{"arc":["a064"],"lv":[7]}]
	,"sk059" : [{"id":"#sk059","skill":"ストーンウォール","sc":"SC:5"},{"arc":["a023","a050"],"lv":[1,3]}]
	,"sk060" : [{"id":"#sk060","skill":"サンダーウォール","sc":"SC:5"},{"arc":["a066"],"lv":[7]}]
	,"sk061" : [{"id":"#sk061","skill":"ホーリーウォール","sc":"SC:5"},{"arc":["a063","a020"],"lv":[8,1]}]
	,"sk062" : [{"id":"#sk062","skill":"シャドウウォール","sc":"SC:5"},{"arc":["a040"],"lv":[4]}]
	,"sk063" : [{"id":"#sk063","skill":"ヘイスト","sc":"SC:5"},{"arc":["a060","a049"],"lv":[8,4]}]
	,"sk064" : [{"id":"#sk064","skill":"ギガブレイサー","sc":"SC:6"},{"arc":["a002"],"lv":[1]}]
	,"sk065" : [{"id":"#sk065","skill":"ギガスイン","sc":"SC:6"},{"arc":["a035","a036"],"lv":[5,3]}]
	,"sk066" : [{"id":"#sk066","skill":"ギガロストマ","sc":"SC:6"},{"arc":["a073","a018"],"lv":[7,2]}]
	,"sk067" : [{"id":"#sk067","skill":"ギガネメシス","sc":"SC:6"},{"arc":["a040","a019"],"lv":[6,3]}]
	,"sk068" : [{"id":"#sk068","skill":"グランドプロテクション","sc":"SC:8"},{"arc":["a046","a021","a025"],"lv":[8,6,5]}]
	,"sk069" : [{"id":"#sk069","skill":"マジックキャッスル","sc":"SC:8"},{"arc":["a041","a008"],"lv":[8,5]}]
	,"sk070" : [{"id":"#sk070","skill":"スピードフェザー","sc":"SC:8"},{"arc":["a049","a012"],"lv":[8,6]}]
	,"sk071" : [{"id":"#sk071","skill":"ブレイブフェザー","sc":"SC:8"},{"arc":["a029","a028"],"lv":[7,6]}]
	,"sk072" : [{"id":"#sk072","skill":"オーラフェザー","sc":"SC:8"},{"arc":["a018","a004"],"lv":[6,5]}]
	,"sk073" : [{"id":"#sk073","skill":"クリティカルフェザー","sc":"SC:10"},{"arc":["a036"],"lv":[10]}]
	,"sk074" : [{"id":"#sk074","skill":"アヌラメルス","sc":"SC:10"},{"arc":["a026"],"lv":[8]}]
	,"sk075" : [{"id":"#sk075","skill":"メティス","sc":"SC:2"},{"arc":["a050"],"lv":[1]}]
	,"sk076" : [{"id":"#sk076","skill":"ハイドロシェル","sc":"SC:6"},{"arc":["a048"],"lv":[10]}]
	,"sk077" : [{"id":"#sk077","skill":"ギガダークネス","sc":"SC:5"},{"arc":["a037"],"lv":[7]}]
	,"sk078" : [{"id":"#sk078","skill":"バイタリティ","sc":"SC:3"},{"arc":["a038"],"lv":[8]}]
	,"sk079" : [{"id":"#sk079","skill":"アイスサークル","sc":"SC:6"},{"arc":["a010"],"lv":[7]}]
	,"sk080" : [{"id":"#sk080","skill":"グランブレイブ","sc":"SC:7"},{"arc":["a028"],"lv":[10]}]
	,"sk081" : [{"id":"#sk081","skill":"ソウルスパーク","sc":"SC:10"},{"arc":["a061"],"lv":[10]}]
	,"sk082" : [{"id":"#sk082","skill":"ヒールウォーター","sc":"SC:2"},{"arc":["a015"],"lv":[1]}]
	,"sk083" : [{"id":"#sk083","skill":"アシッドストーム","sc":"SC:8"},{"arc":["a015"],"lv":[5]}]
	,"sk084" : [{"id":"#sk084","skill":"ルナティック","sc":"SC:8"},{"arc":["a015"],"lv":[9]}]
	,"sk085" : [{"id":"#sk085","skill":"エリクサー","sc":"SC:12"},{"arc":["a024"],"lv":[8]}]
	,"sk086" : [{"id":"#sk086","skill":"ムーンセイバー","sc":"SC:4"},{"arc":["a047"],"lv":[4]}]
	,"sk087" : [{"id":"#sk087","skill":"ホーリーボール","sc":"SC:5"},{"arc":["a047"],"lv":[6]}]
	,"sk088" : [{"id":"#sk088","skill":"フルメタルハガー","sc":"SC:6"},{"arc":["a047"],"lv":[8]}]
	,"sk089" : [{"id":"#sk089","skill":"シャドウサークル","sc":"SC:6"},{"arc":["a069"],"lv":[10]}]
	,"sk090" : [{"id":"#sk090","skill":"ハイプロテクション","sc":"SC:6"},{"arc":["a025"],"lv":[9]}]
	,"sk091" : [{"id":"#sk091","skill":"ホーリーサークル","sc":"SC:0"},{"arc":["a012"],"lv":[6]}]
	,"sk092" : [{"id":"#sk092","skill":"メティスフェザー","sc":"SC:8"},{"arc":["a004"],"lv":[5]}]
	,"sk093" : [{"id":"#sk093","skill":"フォートフェザー","sc":"SC:8"},{"arc":["a022"],"lv":[5]}]
	,"sk094" : [{"id":"#sk094","skill":"ハイマジックバリア","sc":"SC:8"},{"arc":["a008"],"lv":[9]}]
	,"sk095" : [{"id":"#sk095","skill":"ヒートライブ","sc":"SC:15"},{"arc":["a012"],"lv":[10]}]
	,"sk096" : [{"id":"#sk096","skill":"HPアップ","sc":"SC:2"},{"arc":["a070"],"lv":[1]}]
	,"sk097" : [{"id":"#sk097","skill":"HPアップ2","sc":"SC:3"},{"arc":["a045"],"lv":[2]}]
	,"sk098" : [{"id":"#sk098","skill":"HPアップ3","sc":"SC:4"},{"arc":["a009"],"lv":[4]}]
	,"sk099" : [{"id":"#sk099","skill":"HPアップ極","sc":"SC:5"},{"arc":["a070"],"lv":[10]}]
	,"sk100" : [{"id":"#sk100","skill":"MPアップ","sc":"SC:1"},{"arc":["a059"],"lv":[1]}]
	,"sk101" : [{"id":"#sk101","skill":"MPアップ2","sc":"SC:2"},{"arc":["a039"],"lv":[2]}]
	,"sk102" : [{"id":"#sk102","skill":"MPアップ3","sc":"SC:2"},{"arc":["a027","a011"],"lv":[3,3]}]
	,"sk103" : [{"id":"#sk103","skill":"MPアップ極","sc":"SC:4"},{"arc":["a059"],"lv":[10]}]
	,"sk104" : [{"id":"#sk104","skill":"攻撃アップ","sc":"SC:1"},{"arc":["a054"],"lv":[1]}]
	,"sk105" : [{"id":"#sk105","skill":"攻撃アップ2","sc":"SC:2"},{"arc":["a001","a057"],"lv":[1,5]}]
	,"sk106" : [{"id":"#sk106","skill":"攻撃アップ3","sc":"SC:3"},{"arc":["a002","a003"],"lv":[3,3]}]
	,"sk107" : [{"id":"#sk107","skill":"攻撃アップ極","sc":"SC:6"},{"arc":["a054"],"lv":[10]}]
	,"sk108" : [{"id":"#sk108","skill":"防御アップ","sc":"SC:1"},{"arc":["a067"],"lv":[1]}]
	,"sk109" : [{"id":"#sk109","skill":"防御アップ2","sc":"SC:2"},{"arc":["a044"],"lv":[2]}]
	,"sk110" : [{"id":"#sk110","skill":"防御アップ3","sc":"SC:3"},{"arc":["a023"],"lv":[3]}]
	,"sk111" : [{"id":"#sk111","skill":"防御アップ極","sc":"SC:6"},{"arc":["a067"],"lv":[10]}]
	,"sk112" : [{"id":"#sk112","skill":"魔力アップ","sc":"SC:1"},{"arc":["a055"],"lv":[1]}]
	,"sk113" : [{"id":"#sk113","skill":"魔力アップ2","sc":"SC:2"},{"arc":["a031","a061"],"lv":[3,4]}]
	,"sk114" : [{"id":"#sk114","skill":"魔力アップ3","sc":"SC:3"},{"arc":["a006","a004"],"lv":[2,3]}]
	,"sk115" : [{"id":"#sk115","skill":"魔力アップ極","sc":"SC:6"},{"arc":["a055"],"lv":[10]}]
	,"sk116" : [{"id":"#sk116","skill":"精神アップ","sc":"SC:1"},{"arc":["a072"],"lv":[1]}]
	,"sk117" : [{"id":"#sk117","skill":"精神アップ2","sc":"SC:2"},{"arc":["a046"],"lv":[2]}]
	,"sk118" : [{"id":"#sk118","skill":"精神アップ3","sc":"SC:3"},{"arc":["a018","a038"],"lv":[3,6]}]
	,"sk119" : [{"id":"#sk119","skill":"精神アップ極","sc":"SC:6"},{"arc":["a072"],"lv":[10]}]
	,"sk120" : [{"id":"#sk120","skill":"クリティカルアップ","sc":"SC:2"},{"arc":["a058"],"lv":[1]}]
	,"sk121" : [{"id":"#sk121","skill":"クリティカルアップ2","sc":"SC:3"},{"arc":["a032","a056"],"lv":[4,8]}]
	,"sk122" : [{"id":"#sk122","skill":"クリティカルアップ3","sc":"SC:7"},{"arc":["a030"],"lv":[10]}]
	,"sk123" : [{"id":"#sk123","skill":"急所狙い","sc":"SC:4"},{"arc":["a016","a001"],"lv":[4,2]}]
	,"sk124" : [{"id":"#sk124","skill":"プラウドフォース","sc":"SC:4"},{"arc":["a058","a010"],"lv":[7,3]}]
	,"sk125" : [{"id":"#sk125","skill":"ガード","sc":"SC:1"},{"arc":["a071","a067","a044"],"lv":[1,1,1]}]
	,"sk126" : [{"id":"#sk126","skill":"鉄壁ガード","sc":"SC:2"},{"arc":["a071","a021"],"lv":[7,3]}]
	,"sk127" : [{"id":"#sk127","skill":"警戒","sc":"SC:2"},{"arc":["a071","a052"],"lv":[4,1]}]
	,"sk128" : [{"id":"#sk128","skill":"魔法ガード","sc":"SC:4"},{"arc":["a023"],"lv":[10]}]
	,"sk129" : [{"id":"#sk129","skill":"ヒールガード","sc":"SC:4"},{"arc":["a023","a025"],"lv":[4,1]}]
	,"sk130" : [{"id":"#sk130","skill":"マジカルガード","sc":"SC:4"},{"arc":["a044","a008"],"lv":[6,2]}]
	,"sk131" : [{"id":"#sk131","skill":"グランドガード","sc":"SC:4"},{"arc":["a023"],"lv":[5]}]
	,"sk132" : [{"id":"#sk132","skill":"ロイヤルアーマー","sc":"SC:8"},{"arc":["a044","a010"],"lv":[9,5]}]
	,"sk133" : [{"id":"#sk133","skill":"蜃気楼","sc":"SC:5"},{"arc":["a065","a001"],"lv":[7,4]}]
	,"sk134" : [{"id":"#sk134","skill":"カウンター","sc":"SC:2"},{"arc":["a044","a003"],"lv":[3,1]}]
	,"sk135" : [{"id":"#sk135","skill":"ハイカウンター","sc":"SC:4"},{"arc":["a005"],"lv":[6]}]
	,"sk136" : [{"id":"#sk136","skill":"ビーストキラー","sc":"SC:4"},{"arc":["a070","a030"],"lv":[4,1]}]
	,"sk137" : [{"id":"#sk137","skill":"ビーストスレイヤー","sc":"SC:8"},{"arc":["a030"],"lv":[9]}]
	,"sk138" : [{"id":"#sk138","skill":"プラントキラー","sc":"SC:4"},{"arc":["a032","a074"],"lv":[1,5]}]
	,"sk139" : [{"id":"#sk139","skill":"プラントスレイヤー","sc":"SC:8"},{"arc":["a032"],"lv":[9]}]
	,"sk140" : [{"id":"#sk140","skill":"インセクトキラー","sc":"SC:4"},{"arc":["a053"],"lv":[3]}]
	,"sk141" : [{"id":"#sk141","skill":"インセクトスレイヤー","sc":"SC:8"},{"arc":["a053"],"lv":[8]}]
	,"sk142" : [{"id":"#sk142","skill":"バードキラー","sc":"SC:4"},{"arc":["a017"],"lv":[1]}]
	,"sk143" : [{"id":"#sk143","skill":"バードスレイヤー","sc":"SC:8"},{"arc":["a017"],"lv":[6]}]
	,"sk144" : [{"id":"#sk144","skill":"クリートキラー","sc":"SC:4"},{"arc":["a075"],"lv":[4]}]
	,"sk145" : [{"id":"#sk145","skill":"クリートスレイヤー","sc":"SC:8"},{"arc":["a007"],"lv":[8]}]
	,"sk146" : [{"id":"#sk146","skill":"アンデットキラー","sc":"SC:4"},{"arc":["a042"],"lv":[1]}]
	,"sk147" : [{"id":"#sk147","skill":"アンデットスレイヤー","sc":"SC:8"},{"arc":["a042"],"lv":[8]}]
	,"sk148" : [{"id":"#sk148","skill":"ストーンキラー","sc":"SC:4"},{"arc":["a052"],"lv":[2]}]
	,"sk149" : [{"id":"#sk149","skill":"ストーンスレイヤー","sc":"SC:8"},{"arc":["a001"],"lv":[8]}]
	,"sk150" : [{"id":"#sk150","skill":"マシーンキラー","sc":"SC:4"},{"arc":["a066","a069"],"lv":[4,5]}]
	,"sk151" : [{"id":"#sk151","skill":"フィッシュキラー","sc":"SC:4"},{"arc":["a058"],"lv":[4]}]
	,"sk152" : [{"id":"#sk152","skill":"フィッシュスレイヤー","sc":"SC:8"},{"arc":["a005"],"lv":[7]}]
	,"sk153" : [{"id":"#sk153","skill":"スピリットキラー","sc":"SC:4"},{"arc":["a051"],"lv":[2]}]
	,"sk154" : [{"id":"#sk154","skill":"スピリットスレイヤー","sc":"SC:8"},{"arc":["a051"],"lv":[9]}]
	,"sk155" : [{"id":"#sk155","skill":"ドラゴンキラー","sc":"SC:5"},{"arc":["a029"],"lv":[5]}]
	,"sk156" : [{"id":"#sk156","skill":"ドラゴンスレイヤー","sc":"SC:9"},{"arc":["a029"],"lv":[10]}]
	,"sk157" : [{"id":"#sk157","skill":"ゴッドキラー","sc":"SC:5"},{"arc":["a016"],"lv":[2]}]
	,"sk158" : [{"id":"#sk158","skill":"ゴッドスレイヤー","sc":"SC:9"},{"arc":["a016"],"lv":[10]}]
	,"sk159" : [{"id":"#sk159","skill":"ソルジャーキラー","sc":"SC:5"},{"arc":["a043","a003"],"lv":[6,3]}]
	,"sk160" : [{"id":"#sk160","skill":"ソルジャースレイヤー","sc":"SC:9"},{"arc":["a022"],"lv":[10]}]
	,"sk161" : [{"id":"#sk161","skill":"ナイトキラー","sc":"SC:5"},{"arc":["a043"],"lv":[7]}]
	,"sk162" : [{"id":"#sk162","skill":"ナイトスレイヤー","sc":"SC:9"},{"arc":["a010"],"lv":[8]}]
	,"sk163" : [{"id":"#sk163","skill":"スナイパーキラー","sc":"SC:5"},{"arc":["a043"],"lv":[4]}]
	,"sk164" : [{"id":"#sk164","skill":"ウイッチキラー","sc":"SC:5"},{"arc":["a043"],"lv":[5]}]
	,"sk165" : [{"id":"#sk165","skill":"炎アタックレイズ","sc":"SC:11"},{"arc":["a032"],"lv":[10]}]
	,"sk166" : [{"id":"#sk166","skill":"氷アタックレイズ","sc":"SC:11"},{"arc":["a035"],"lv":[10]}]
	,"sk167" : [{"id":"#sk167","skill":"樹アタックレイズ","sc":"SC:11"},{"arc":["a013"],"lv":[9]}]
	,"sk168" : [{"id":"#sk168","skill":"雷アタックレイズ","sc":"SC:11"},{"arc":["a034"],"lv":[10]}]
	,"sk169" : [{"id":"#sk169","skill":"光アタックレイズ","sc":"SC:11"},{"arc":["a004"],"lv":[10]}]
	,"sk170" : [{"id":"#sk170","skill":"闇アタックレイズ","sc":"SC:11"},{"arc":["a037"],"lv":[10]}]
	,"sk171" : [{"id":"#sk171","skill":"剣装備","sc":"SC:2"},{"arc":["a058"],"lv":[01]}]
	,"sk172" : [{"id":"#sk172","skill":"斧装備","sc":"SC:2"},{"arc":["a005"],"lv":[4]}]
	,"sk173" : [{"id":"#sk173","skill":"槍装備","sc":"SC:2"},{"arc":["a021","a057"],"lv":[4,8]}]
	,"sk174" : [{"id":"#sk174","skill":"槌装備","sc":"SC:2"},{"arc":["a052"],"lv":[8]}]
	,"sk175" : [{"id":"#sk175","skill":"弓装備","sc":"SC:2"},{"arc":["a017"],"lv":[4]}]
	,"sk176" : [{"id":"#sk176","skill":"機械装備","sc":"SC:2"},{"arc":["a002"],"lv":[4]}]
	,"sk177" : [{"id":"#sk177","skill":"爪装備","sc":"SC:2"},{"arc":["a030"],"lv":[7]}]
	,"sk178" : [{"id":"#sk178","skill":"杖装備","sc":"SC:2"},{"arc":["a068"],"lv":[10]}]
	,"sk179" : [{"id":"#sk179","skill":"鎧装備","sc":"SC:2"},{"arc":["a071"],"lv":[10]}]
	,"sk180" : [{"id":"#sk180","skill":"服装備","sc":"SC:2"},{"arc":["a076"],"lv":[10]}]
	,"sk181" : [{"id":"#sk181","skill":"ローブ装備","sc":"SC:2"},{"arc":["a077"],"lv":[10]}]
	,"sk182" : [{"id":"#sk182","skill":"毒耐性","sc":"SC:4"},{"arc":["a053"],"lv":[2]}]
	,"sk183" : [{"id":"#sk183","skill":"暗闇耐性","sc":"SC:4"},{"arc":["a079","a033"],"lv":[4,2]}]
	,"sk184" : [{"id":"#sk184","skill":"沈黙耐性","sc":"SC:4"},{"arc":["a029"],"lv":[1]}]
	,"sk185" : [{"id":"#sk185","skill":"呪い耐性","sc":"SC:4"},{"arc":["a048"],"lv":[2]}]
	,"sk186" : [{"id":"#sk186","skill":"麻痺耐性","sc":"SC:5"},{"arc":["a034"],"lv":[3]}]
	,"sk187" : [{"id":"#sk187","skill":"病気耐性","sc":"SC:5"},{"arc":["a075"],"lv":[8]}]
	,"sk188" : [{"id":"#sk188","skill":"毒無効","sc":"SC:8"},{"arc":["a026"],"lv":[4]}]
	,"sk189" : [{"id":"#sk189","skill":"暗闇無効","sc":"SC:8"},{"arc":["a019"],"lv":[6]}]
	,"sk190" : [{"id":"#sk190","skill":"沈黙無効","sc":"SC:8"},{"arc":["a028"],"lv":[8]}]
	,"sk191" : [{"id":"#sk191","skill":"呪い無効","sc":"SC:8"},{"arc":["a014"],"lv":[6]}]
	,"sk192" : [{"id":"#sk192","skill":"麻痺無効","sc":"SC:10"},{"arc":["a006"],"lv":[7]}]
	,"sk193" : [{"id":"#sk193","skill":"ファストブレイブ","sc":"SC:2"},{"arc":["a054","a019"],"lv":[6,2]}]
	,"sk194" : [{"id":"#sk194","skill":"ファストオーラ","sc":"SC:2"},{"arc":["a055"],"lv":[6]}]
	,"sk195" : [{"id":"#sk195","skill":"ファストプロテクション","sc":"SC:2"},{"arc":["a067"],"lv":[6]}]
	,"sk196" : [{"id":"#sk196","skill":"ファストバリア","sc":"SC:2"},{"arc":["a072"],"lv":[6]}]
	,"sk197" : [{"id":"#sk197","skill":"オートブレイブ","sc":"SC:7"},{"arc":["a029"],"lv":[8]}]
	,"sk198" : [{"id":"#sk198","skill":"オートプロテクション","sc":"SC:7"},{"arc":["a046"],"lv":[10]}]
	,"sk199" : [{"id":"#sk199","skill":"オートオーラ","sc":"SC:7"},{"arc":["a020"],"lv":[10]}]
	,"sk200" : [{"id":"#sk200","skill":"オートバリア","sc":"SC:7"},{"arc":["a023"],"lv":[8]}]
	,"sk201" : [{"id":"#sk201","skill":"オートリジェネ","sc":"SC:11"},{"arc":["a039"],"lv":[10]}]
	,"sk202" : [{"id":"#sk202","skill":"オートヘイスト","sc":"SC:14"},{"arc":["a049"],"lv":[10]}]
	,"sk203" : [{"id":"#sk203","skill":"激高","sc":"SC:2"},{"arc":["a070","a074"],"lv":[2,1]}]
	,"sk204" : [{"id":"#sk204","skill":"忍耐","sc":"SC:2"},{"arc":["a054","a052"],"lv":[2,1]}]
	,"sk205" : [{"id":"#sk205","skill":"感応","sc":"SC:2"},{"arc":["a055","a061"],"lv":[2,2]}]
	,"sk206" : [{"id":"#sk206","skill":"静暖","sc":"SC:2"},{"arc":["a072","a038"],"lv":[3,1]}]
	,"sk207" : [{"id":"#sk207","skill":"加速","sc":"SC:2"},{"arc":["a049"],"lv":[2]}]
	,"sk208" : [{"id":"#sk208","skill":"堂々","sc":"SC:4"},{"arc":["a030","a022"],"lv":[2,1]}]
	,"sk209" : [{"id":"#sk209","skill":"月光","sc":"SC:4"},{"arc":["a059"],"lv":[6]}]
	,"sk210" : [{"id":"#sk210","skill":"飛影","sc":"SC:4"},{"arc":["a016","a056"],"lv":[1,5]}]
	,"sk211" : [{"id":"#sk211","skill":"スカイハイ","sc":"SC:4"},{"arc":["a016","a069"],"lv":[6,7]}]
	,"sk212" : [{"id":"#sk212","skill":"不意打ち","sc":"SC:4"},{"arc":["a030","a007"],"lv":[4,2]}]
	,"sk213" : [{"id":"#sk213","skill":"テラーメルス","sc":"SC:4"},{"arc":["a020","a007","a026"],"lv":[6,5,2]}]
	,"sk214" : [{"id":"#sk214","skill":"マグリオン","sc":"SC:11"},{"arc":["a017"],"lv":[10]}]
	,"sk215" : [{"id":"#sk215","skill":"ピヨリン","sc":"SC:3"},{"arc":["a070"],"lv":[7]}]
	,"sk216" : [{"id":"#sk216","skill":"炎ブースト","sc":"SC:3"},{"arc":["a041"],"lv":[6]}]
	,"sk217" : [{"id":"#sk217","skill":"氷ブースト","sc":"SC:3"},{"arc":["a035"],"lv":[6]}]
	,"sk218" : [{"id":"#sk218","skill":"樹ブースト","sc":"SC:3"},{"arc":["a013"],"lv":[2]}]
	,"sk219" : [{"id":"#sk219","skill":"雷ブースト","sc":"SC:3"},{"arc":["a034"],"lv":[6]}]
	,"sk220" : [{"id":"#sk220","skill":"光ブースト","sc":"SC:3"},{"arc":["a014","a061"],"lv":[4,7]}]
	,"sk221" : [{"id":"#sk221","skill":"闇ブースト","sc":"SC:3"},{"arc":["a006"],"lv":[4]}]
	,"sk222" : [{"id":"#sk222","skill":"回復ブースト","sc":"SC:3"},{"arc":["a039","a009"],"lv":[6,3]}]
	,"sk223" : [{"id":"#sk223","skill":"炎ハイブースト","sc":"SC:8"},{"arc":["a019"],"lv":[9]}]
	,"sk224" : [{"id":"#sk224","skill":"氷ハイブースト","sc":"SC:8"},{"arc":["a018"],"lv":[9]}]
	,"sk225" : [{"id":"#sk225","skill":"樹ハイブースト","sc":"SC:8"},{"arc":["a021"],"lv":[10]}]
	,"sk226" : [{"id":"#sk226","skill":"雷ハイブースト","sc":"SC:8"},{"arc":["a002"],"lv":[9]}]
	,"sk227" : [{"id":"#sk227","skill":"光ハイブースト","sc":"SC:8"},{"arc":["a020"],"lv":[9]}]
	,"sk228" : [{"id":"#sk228","skill":"闇ハイブースト","sc":"SC:8"},{"arc":["a026"],"lv":[10]}]
	,"sk229" : [{"id":"#sk229","skill":"炎クリティカル","sc":"SC:6"},{"arc":["a062"],"lv":[10]}]
	,"sk230" : [{"id":"#sk230","skill":"氷クリティカル","sc":"SC:6"},{"arc":["a064"],"lv":[10]}]
	,"sk231" : [{"id":"#sk231","skill":"樹クリティカル","sc":"SC:6"},{"arc":["a065"],"lv":[10]}]
	,"sk232" : [{"id":"#sk232","skill":"雷クリティカル","sc":"SC:6"},{"arc":["a066"],"lv":[10]}]
	,"sk233" : [{"id":"#sk233","skill":"光クリティカル","sc":"SC:6"},{"arc":["a063"],"lv":[10]}]
	,"sk234" : [{"id":"#sk234","skill":"闇クリティカル","sc":"SC:6"},{"arc":["a031"],"lv":[10]}]
	,"sk235" : [{"id":"#sk235","skill":"毒研究","sc":"SC:6"},{"arc":["a053","a074"],"lv":[7,8]}]
	,"sk236" : [{"id":"#sk236","skill":"暗闇研究","sc":"SC:6"},{"arc":["a036","a003"],"lv":[6,5]}]
	,"sk237" : [{"id":"#sk237","skill":"沈黙研究","sc":"SC:6"},{"arc":["a051","a017"],"lv":[7,2]}]
	,"sk238" : [{"id":"#sk238","skill":"呪い研究","sc":"SC:6"},{"arc":["a077","a037","a080"],"lv":[8,4,3]}]
	,"sk239" : [{"id":"#sk239","skill":"病気研究","sc":"SC:10"},{"arc":["a075"],"lv":[10]}]
	,"sk240" : [{"id":"#sk240","skill":"ブラッドフォース","sc":"SC:11"},{"arc":["a051"],"lv":[10]}]
	,"sk241" : [{"id":"#sk241","skill":"女神のキス","sc":"SC:11"},{"arc":["a027"],"lv":[9]}]
	,"sk242" : [{"id":"#sk242","skill":"勝利のポーズ","sc":"SC:2"},{"arc":["a032","a012"],"lv":[2,1]}]
	,"sk243" : [{"id":"#sk243","skill":"栄光のポーズ","sc":"SC:2"},{"arc":["a021"],"lv":[1]}]
	,"sk244" : [{"id":"#sk244","skill":"栄誉のポーズ","sc":"SC:2"},{"arc":["a059"],"lv":[5]}]
	,"sk245" : [{"id":"#sk245","skill":"勝利の美酒","sc":"SC:4"},{"arc":["a033"],"lv":[6]}]
	,"sk246" : [{"id":"#sk246","skill":"栄光の美酒","sc":"SC:4"},{"arc":["a052"],"lv":[6]}]
	,"sk247" : [{"id":"#sk247","skill":"栄誉の美酒","sc":"SC:4"},{"arc":["a046"],"lv":[4]}]
	,"sk248" : [{"id":"#sk248","skill":"大天使の加護","sc":"SC:9"},{"arc":["a014"],"lv":[8]}]
	,"sk249" : [{"id":"#sk249","skill":"海賊の宴","sc":"SC:9"},{"arc":["a005"],"lv":[10]}]
	,"sk250" : [{"id":"#sk250","skill":"斧ハイブースト","sc":"SC:9"},{"arc":["a007"],"lv":[10]}]
	,"sk251" : [{"id":"#sk251","skill":"チャージ特技1","sc":"SC:3"},{"arc":["a007"],"lv":[4]}]
	,"sk252" : [{"id":"#sk252","skill":"不動の陣","sc":"SC:11"},{"arc":["a027"],"lv":[10]}]
	,"sk253" : [{"id":"#sk253","skill":"魔転相","sc":"SC:9"},{"arc":["a018"],"lv":[10]}]
	,"sk254" : [{"id":"#sk254","skill":"魅惑の香り","sc":"SC:4"},{"arc":["a045"],"lv":[4]}]
	,"sk255" : [{"id":"#sk255","skill":"激臭王","sc":"SC:4"},{"arc":["a033"],"lv":[4]}]
	,"sk256" : [{"id":"#sk256","skill":"ダメージ吸収","sc":"SC:4"},{"arc":["a051","a080"],"lv":[4,4]}]
	,"sk257" : [{"id":"#sk257","skill":"劇薬","sc":"SC:7"},{"arc":["a053"],"lv":[10]}]
	,"sk258" : [{"id":"#sk258","skill":"韋駄天","sc":"SC:8"},{"arc":["a016"],"lv":[8]}]
	,"sk259" : [{"id":"#sk259","skill":"貫通","sc":"SC:7"},{"arc":["a017"],"lv":[9]}]
	,"sk260" : [{"id":"#sk260","skill":"聖なるオーラ","sc":"SC:9"},{"arc":["a042"],"lv":[10]}]
	,"sk261" : [{"id":"#sk261","skill":"追撃","sc":"SC:2"},{"arc":["a054","a042"],"lv":[3,1]}]
	,"sk262" : [{"id":"#sk262","skill":"ダブルインパクト","sc":"SC:5"},{"arc":["a032","a013"],"lv":[7,4]}]
	,"sk263" : [{"id":"#sk263","skill":"トリプルインパクト","sc":"SC:11"},{"arc":["a033"],"lv":[10]}]
	,"sk264" : [{"id":"#sk264","skill":"二刀流","sc":"SC:14"},{"arc":["a013"],"lv":[10]}]
	,"sk265" : [{"id":"#sk265","skill":"衝撃波","sc":"SC:7"},{"arc":["a073"],"lv":[10]}]
	,"sk266" : [{"id":"#sk266","skill":"デコイ","sc":"SC:7"},{"arc":["a040"],"lv":[10]}]
	,"sk267" : [{"id":"#sk267","skill":"根性","sc":"SC:7"},{"arc":["a005","a022"],"lv":[8,8]}]
	,"sk268" : [{"id":"#sk268","skill":"魔導オーラ","sc":"SC:9"},{"arc":["a002"],"lv":[10]}]
	,"sk269" : [{"id":"#sk269","skill":"ＥＸＰアップ","sc":"SC:12"},{"arc":["a045","a043"],"lv":[10,10]}]
	,"sk270" : [{"id":"#sk270","skill":"ゴールドラッシュ","sc":"SC:12"},{"arc":["a052"],"lv":[10]}]
	,"sk271" : [{"id":"#sk271","skill":"チャンスドライブ","sc":"SC:6"},{"arc":["a079"],"lv":[10]}]
	,"sk272" : [{"id":"#sk272","skill":"ブレイカー","sc":"SC:5"},{"arc":["a005","a007"],"lv":[1,1]}]
	,"sk273" : [{"id":"#sk273","skill":"死神","sc":"SC:7"},{"arc":["a006"],"lv":[9]}]
	,"sk274" : [{"id":"#sk274","skill":"急速回復","sc":"SC:4"},{"arc":["a045","a038"],"lv":[7,5]}]
	,"sk275" : [{"id":"#sk275","skill":"意識集中","sc":"SC:4"},{"arc":["a079"],"lv":[7]}]
	,"sk276" : [{"id":"#sk276","skill":"リベンジブレイブ","sc":"SC:6"},{"arc":["a044"],"lv":[10]}]
	,"sk277" : [{"id":"#sk277","skill":"リベンジオーラ","sc":"SC:6"},{"arc":["a031"],"lv":[9]}]
	,"sk278" : [{"id":"#sk278","skill":"高位魔法詠唱陣","sc":"SC:9"},{"arc":["a060","a036"],"lv":[8,6]}]
	,"sk279" : [{"id":"#sk279","skill":"精霊呼吸法","sc":"SC:4"},{"arc":["a014"],"lv":[2]}]
	,"sk280" : [{"id":"#sk280","skill":"カムイノミ","sc":"SC:4"},{"arc":["a050"],"lv":[10]}]
	,"sk281" : [{"id":"#sk281","skill":"ファストクリティカル","sc":"SC:2"},{"arc":["a001"],"lv":[6]}]
	,"sk282" : [{"id":"#sk282","skill":"星眼","sc":"SC:9"},{"arc":["a001"],"lv":[10]}]
	,"sk283" : [{"id":"#sk283","skill":"ファストメティス","sc":"SC:2"},{"arc":["a020"],"lv":[2]}]
	,"sk284" : [{"id":"#sk284","skill":"ガードチャージ","sc":"SC:4"},{"arc":["a021"],"lv":[4]}]
	,"sk285" : [{"id":"#sk285","skill":"背閃撃","sc":"SC:2"},{"arc":["a056"],"lv":[4]}]
	,"sk286" : [{"id":"#sk286","skill":"特攻ブースト","sc":"SC:6"},{"arc":["a056"],"lv":[10]}]
	,"sk287" : [{"id":"#sk287","skill":"チャージ特技2","sc":"SC:3"},{"arc":["a009"],"lv":[6]}]
	,"sk288" : [{"id":"#sk288","skill":"ファスト中級魔法陣","sc":"SC:1"},{"arc":["a009"],"lv":[8]}]
	,"sk289" : [{"id":"#sk289","skill":"黄昏","sc":"SC:4"},{"arc":["a038"],"lv":[2]}]
	,"sk290" : [{"id":"#sk290","skill":"ファストバケーション","sc":"SC:5"},{"arc":["a038"],"lv":[10]}]
	,"sk291" : [{"id":"#sk291","skill":"擬態【植物】","sc":"SC:2"},{"arc":["a074"],"lv":[2]}]
	,"sk292" : [{"id":"#sk292","skill":"腐食の牙","sc":"SC:7"},{"arc":["a074"],"lv":[10]}]
	,"sk293" : [{"id":"#sk293","skill":"ストック特技1","sc":"SC:3"},{"arc":["a028"],"lv":[3]}]
	,"sk294" : [{"id":"#sk294","skill":"ファストアイスウォール","sc":"SC:5"},{"arc":["a028"],"lv":[5]}]
	,"sk295" : [{"id":"#sk295","skill":"剣ハイブースト","sc":"SC:9"},{"arc":["a003"],"lv":[10]}]
	,"sk296" : [{"id":"#sk296","skill":"急所狙い・改","sc":"SC:6"},{"arc":["a003"],"lv":[8]}]
	,"sk297" : [{"id":"#sk297","skill":"ダッシュ","sc":"SC:5"},{"arc":["a015"],"lv":[3]}]
	,"sk298" : [{"id":"#sk298","skill":"パワーカウンター","sc":"SC:5"},{"arc":["a015"],"lv":[7]}]
	,"sk299" : [{"id":"#sk299","skill":"マナの加護","sc":"SC:3"},{"arc":["a015"],"lv":[10]}]
	,"sk300" : [{"id":"#sk300","skill":"そうだん","sc":"SC:3"},{"arc":["a024"],"lv":[1]}]
	,"sk301" : [{"id":"#sk301","skill":"ジェマの騎士","sc":"SC:6"},{"arc":["a024"],"lv":[10]}]
	,"sk302" : [{"id":"#sk302","skill":"マナの祝日","sc":"SC:5"},{"arc":["a047"],"lv":[10]}]
	,"sk303" : [{"id":"#sk303","skill":"アマンダの血","sc":"SC:2"},{"arc":["a024"],"lv":[2]}]
	,"sk304" : [{"id":"#sk304","skill":"マトック","sc":"SC:4"},{"arc":["a024"],"lv":[4]}]
	,"sk305" : [{"id":"#sk305","skill":"モンキーベイビー","sc":"SC:8"},{"arc":["a024"],"lv":[6]}]
	,"sk306" : [{"id":"#sk306","skill":"ウィスプの刻","sc":"SC:3"},{"arc":["a047"],"lv":[1]}]
	,"sk307" : [{"id":"#sk307","skill":"シェイドの刻","sc":"SC:3"},{"arc":["a047"],"lv":[1]}]
	,"sk308" : [{"id":"#sk308","skill":"ゴッドシールド","sc":"SC:9"},{"arc":["a025"],"lv":[7]}]
	,"sk309" : [{"id":"#sk309","skill":"天塊","sc":"SC:9"},{"arc":["a025"],"lv":[10]}]
	,"sk310" : [{"id":"#sk310","skill":"ファストホーリーウォール","sc":"SC:5"},{"arc":["a025"],"lv":[2]}]
	,"sk311" : [{"id":"#sk311","skill":"擬態【竜】","sc":"SC:2"},{"arc":["a057"],"lv":[2]}]
	,"sk312" : [{"id":"#sk312","skill":"槍ブースト","sc":"SC:4"},{"arc":["a057"],"lv":[10]}]
	,"sk313" : [{"id":"#sk313","skill":"鋭気","sc":"SC:4"},{"arc":["a010"],"lv":[1]}]
	,"sk314" : [{"id":"#sk314","skill":"オートクリティカル","sc":"SC:9"},{"arc":["a010"],"lv":[10]}]
	,"sk315" : [{"id":"#sk315","skill":"光降る聖夜","sc":"SC:3"},{"arc":["a011"],"lv":[1]}]
	,"sk316" : [{"id":"#sk316","skill":"クイックトリガー","sc":"SC:6"},{"arc":["a011"],"lv":[5]}]
	,"sk317" : [{"id":"#sk317","skill":"イルミネーション","sc":"SC:8"},{"arc":["a011"],"lv":[10]}]
	,"sk318" : [{"id":"#sk318","skill":"擬態【神】","sc":"SC:2"},{"arc":["a004"],"lv":[1]}]
	,"sk319" : [{"id":"#sk319","skill":"リーンフォース","sc":"SC:5"},{"arc":["a004"],"lv":[7]}]
	,"sk320" : [{"id":"#sk320","skill":"防御アップ4","sc":"SC:5"},{"arc":["a022"],"lv":[3]}]
	,"sk321" : [{"id":"#sk321","skill":"ソルジャーシールド","sc":"SC:9"},{"arc":["a022"],"lv":[6]}]
	,"sk322" : [{"id":"#sk322","skill":"チャージ特技3","sc":"SC:3"},{"arc":["a008"],"lv":[1]}]
	,"sk323" : [{"id":"#sk323","skill":"アンデッドシールド","sc":"SC:9"},{"arc":["a008"],"lv":[7]}]
	,"sk324" : [{"id":"#sk324","skill":"ローブハイブースト","sc":"SC:9"},{"arc":["a008"],"lv":[10]}]
	,"sk325" : [{"id":"#sk325","skill":"ストック特技2","sc":"SC:4"},{"arc":["a012"],"lv":[3]}]
	,"sk326" : [{"id":"#sk326","skill":"服ハイブースト","sc":"SC:9"},{"arc":["a012"],"lv":[9]}]
	,"sk327" : [{"id":"#sk327","skill":"覚醒","sc":"SC:9"},{"arc":["a019"],"lv":[10]}]
	,"sk328" : [{"id":"#sk328","skill":"擬態【不死生物】","sc":"SC:2"},{"arc":["a080"],"lv":[1]}]
	,"sk329" : [{"id":"#sk329","skill":"ギガカーズ","sc":"SC:7"},{"arc":["a080"],"lv":[7]}]
	,"sk330" : [{"id":"#sk330","skill":"ハイネメシス","sc":"SC:7"},{"arc":["a080"],"lv":[9]}]
	,"sk331" : [{"id":"#sk331","skill":"黄泉の理","sc":"SC:11"},{"arc":["a080"],"lv":[10]}]
	,"sk332" : [{"id":"#sk332","skill":"中級魔法陣展開","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk333" : [{"id":"#sk333","skill":"上級魔法陣展開","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk334" : [{"id":"#sk334","skill":"オートヒール","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk335" : [{"id":"#sk335","skill":"グランオーラ","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk336" : [{"id":"#sk336","skill":"ライフブレイブ","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk337" : [{"id":"#sk337","skill":"マキュアパラライズ","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk338" : [{"id":"#sk338","skill":"ガードインパクト","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk339" : [{"id":"#sk339","skill":"MPアップ4","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk340" : [{"id":"#sk340","skill":"雷クリティカルレイズ","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk341" : [{"id":"#sk341","skill":"無属性アタックレイズ","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk342" : [{"id":"#sk342","skill":"麻痺研究","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk343" : [{"id":"#sk343","skill":"風の太鼓","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk344" : [{"id":"#sk344","skill":"氷アタックレイズ2","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk345" : [{"id":"#sk345","skill":"破神の眷属","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk346" : [{"id":"#sk346","skill":"リバイブ","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk347" : [{"id":"#sk347","skill":"リバースクロス","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk348" : [{"id":"#sk348","skill":"ラストソング","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk349" : [{"id":"#sk349","skill":"ユグドラシルの聖護","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk350" : [{"id":"#sk350","skill":"マナ","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk351" : [{"id":"#sk351","skill":"マシーンスレイヤー","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk352" : [{"id":"#sk352","skill":"マグナエキサイター","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk353" : [{"id":"#sk353","skill":"マーキュリーヴェール","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk354" : [{"id":"#sk354","skill":"ホーリーセイバー","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk355" : [{"id":"#sk355","skill":"フレイムセイバー","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk356" : [{"id":"#sk356","skill":"フルシェルター","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk357" : [{"id":"#sk357","skill":"ファイアボール","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk358" : [{"id":"#sk358","skill":"ファイアカクテル","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk359" : [{"id":"#sk359","skill":"バースト","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk360" : [{"id":"#sk360","skill":"トリックレスト","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk361" : [{"id":"#sk361","skill":"ディヴォーション","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk362" : [{"id":"#sk362","skill":"ダイヤミサイル","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk363" : [{"id":"#sk363","skill":"セイントビーム","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk364" : [{"id":"#sk364","skill":"スポイト","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk365" : [{"id":"#sk365","skill":"ストーンセイバー","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk366" : [{"id":"#sk366","skill":"サンダーセイバー","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk367" : [{"id":"#sk367","skill":"コンボマスター2","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk368" : [{"id":"#sk368","skill":"コンボマスター","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk369" : [{"id":"#sk369","skill":"エクスプロード","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk370" : [{"id":"#sk370","skill":"ウイッチスレイヤー","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk371" : [{"id":"#sk371","skill":"イビルゲート","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk372" : [{"id":"#sk372","skill":"アイスセイバー","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk373" : [{"id":"#sk373","skill":"アースクエイク","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk374" : [{"id":"#sk374","skill":"杖ハイブースト","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk375" : [{"id":"#sk375","skill":"召喚獣の霊揮","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk376" : [{"id":"#sk376","skill":"光闇の魔極","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk377" : [{"id":"#sk377","skill":"剣ブースト","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk378" : [{"id":"#sk378","skill":"擬態【ウィッチ】","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk379" : [{"id":"#sk379","skill":"鎧ハイブースト","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk380" : [{"id":"#sk380","skill":"暗黒剣","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk381" : [{"id":"#sk381","skill":"攻撃アップⅣ","sc":"SC:-"},{"arc":[""],"lv":[]}]
	,"sk382" : [{"id":"#sk382","skill":"スカイハイ2","sc":"SC:-"},{"arc":[""],"lv":[]}]
}

const unitSkillList = {
	uni001 : ["sk104","sk242","sk261","sk207","sk211","sk271","sk193","sk029","sk332","sk057"]
	,uni002 : ["sk203","sk134","sk144","sk123","sk272","sk025","sk332","sk032","sk060","sk039","sk333"]
	,uni003 : ["sk117","sk001","sk042","sk026","sk013","sk332","sk004","sk007","sk004","sk014","sk333","sk069","sk019"]
	,uni004 : ["sk217","sk244","sk278","sk224","sk023","sk047","sk030","sk332","sk065","sk058","sk333","sk043","sk037","sk072"]
	,uni005 : ["sk274","sk048","sk002","sk046","sk008","sk332","sk059","sk063","sk045","sk071"]
	,uni006 : ["sk184","sk222","sk001","sk012","sk009","sk332","sk013","sk005","sk011","sk333","sk010","sk337","sk018","sk017"]
	,uni007 : ["sk136","sk097","sk215","sk125","sk203","sk213","sk098","sk137","sk265","sk099"]
	,uni008 : ["sk205","sk256","sk161","sk237","sk278","sk044","sk062","sk332","sk034","sk022","sk333","sk035","sk027"]
	,uni009 : ["sk125","sk148","sk109","sk127","sk129","sk254","sk195","sk204","sk132","sk270"]
	,uni010 : ["sk194","sk213","sk229","sk190","sk252","sk022","sk044","sk053","sk024","sk028","sk029","sk332","sk031","sk036","sk333","sk067"]
	,uni011 : ["sk262","sk212","sk236","sk368","sk024","sk050","sk045","sk051","sk056","sk332","sk054","sk070"]
	,uni012 : ["sk104","sk120","sk210","sk157","sk121","sk123","sk259","sk158","sk197","sk049"]
	,uni013 : ["sk261","sk211","sk133","sk246","sk164","sk045","sk046","sk056","sk071","sk332","sk073"]
	,uni014 : ["sk096","sk134","sk151","sk208","sk245","sk135","sk152","sk249","sk046","sk058"]
	,uni015 : ["sk124","sk258","sk368","sk230","sk264","sk023","sk048","sk030","sk015","sk065","sk332","sk037"]
	,uni016 : ["sk247","sk241","sk233","sk007","sk006","sk026","sk332","sk061","sk004","sk010","sk016","sk020","sk333","sk040","sk021"]
	,uni017 : ["sk125","sk204","sk146","sk275","sk098","sk003","sk026","sk014","sk332","sk004","sk061","sk333","sk068"]
	,uni018 : ["sk120","sk123","sk104","sk207","sk243","sk163","sk212","sk258","sk022"]
	,uni019 : ["sk104","sk097","sk164","sk215","sk239","sk050","sk044","sk054","sk052","sk055","sk064"]
	,uni020 : ["sk108","sk204","sk134","sk242","sk138","sk120","sk097","sk109","sk195","sk110","sk267"]
	,uni021 : ["sk116","sk117","sk222","sk119","sk002","sk024","sk009","sk004","sk011","sk014","sk332","sk038"]
	,uni022 : ["sk108","sk238","sk213","sk153","sk125","sk256","sk154","sk027","sk053","sk055","sk028"]
	,uni023 : ["sk209","sk101","sk027","sk022","sk044","sk055","sk042","sk047","sk062","sk332","sk066","sk057","sk074"]
	,uni024 : ["sk203","sk108","sk204","sk109","sk097","sk105","sk110","sk275","sk042","sk059","sk068"]
	,uni025 : ["sk108","sk151","sk109","sk274","sk217","sk152","sk023","sk051","sk030","sk058"]
	,uni026 : ["sk120","sk261","sk105","sk208","sk159","sk272","sk106","sk271","sk025","sk046","sk032"]
	,uni027 : ["sk125","sk096","sk206","sk127","sk254","sk097","sk109","sk196","sk128","sk043","sk052","sk062"]
	,uni028 : ["sk206","sk146","sk186","sk196","sk147","sk248","sk026","sk003","sk063","sk007","sk332","sk061","sk069","sk019"]
	,uni029 : ["sk203","sk155","sk156","sk243","sk215","sk165","sk276","sk327","sk022"]
	,uni030 : ["sk204","sk213","sk234","sk253","sk273","sk072","sk027","sk056","sk054","sk034","sk332","sk041","sk333"]
	,uni031 : ["sk134","sk246","sk208","sk193","sk164","sk351","sk123","sk265","sk259","sk049"]
	,uni032 : ["sk109","sk275","sk134","sk126","sk132","sk128","sk025","sk032"]
	,uni033 : ["sk205","sk244","sk196","sk113","sk216","sk199","sk268","sk022","sk047","sk029","sk332","sk036","sk333","sk057"]
	,uni034 : ["sk108","sk125","sk097","sk110","sk284","sk267","sk231","sk225","sk001","sk004","sk031","sk004","sk038"]
	,uni035 : ["sk285","sk207","sk120","sk243","sk212","sk262","sk133","sk258","sk270","sk170","sk044","sk049","sk063"]
	,uni036 : ["sk205","sk209","sk217","sk278","sk166","sk023","sk030","sk332","sk333","sk014","sk013","sk037","sk018"]
	,uni037 : ["sk203","sk205","sk243","sk123","sk214","sk232","sk342","sk281","sk168","sk025","sk332","sk032","sk333","sk039"]
	,uni038 : ["sk261","sk204","sk140","sk144","sk146","sk377","sk148","sk243","sk156","sk107","sk123","sk341","sk343"]
	,uni039 : ["sk203","sk208","sk242","sk136","sk144","sk149","sk147","sk272","sk105","sk271","sk165","sk286","sk295"]
	,uni040 : ["sk063","sk082","sk358","sk372","sk332","sk355","sk366","sk333","sk354","sk365","sk363","sk346","sk018","sk350"]
	,uni041 : ["sk113","sk114","sk103","sk357","sk025","sk373","sk332","sk362","sk364","sk333","sk369","sk359","sk054","sk371","sk350"]
	,uni042 : ["sk104","sk203","sk109","sk105","sk204","sk134","sk193","sk246","sk250","sk272","sk135","sk107","sk282","sk024","sk333","sk038"]
	,uni043 : ["sk117","sk244","sk349","sk119","sk280","sk114","sk278","sk375","sk031","sk004","sk063","sk014","sk010","sk078","sk091","sk333","sk335","sk019"]
	,uni044 : ["sk243","sk120","sk163","sk161","sk211","sk313","sk121","sk377","sk123","sk370","sk314","sk296","sk160","sk344"]
	,uni045 : ["sk113","sk184","sk101","sk244","sk233","sk102","sk278","sk115","sk169","sk374","sk004","sk061","sk063","sk333","sk069","sk073","sk040","sk080","sk356"]
	,uni046 : ["sk125","sk127","sk284","sk131","sk098","sk245","sk377","sk126","sk111","sk338","sk107","sk327","sk170","sk345","sk379","sk380","sk034","sk333","sk041"]
	,uni047 : ["sk264","sk242","sk262","sk118","sk222","sk377","sk279","sk133","sk381","sk259","sk340","sk168","sk316","sk258","sk367","sk007","sk017","sk333","sk021"]
	,uni048 : ["sk378","sk113","sk233","sk234","sk115","sk103","sk278","sk253","sk169","sk170","sk199","sk248","sk324","sk252","sk376","sk334","sk004","sk034","sk067","sk040","sk041","sk333"]
	,uni049 : ["sk102","sk243","sk275","sk339","sk258","sk316","sk348","sk260","sk266","sk267","sk241","sk071","sk072","sk092","sk070","sk095","sk333","sk361","sk352"]
	,uni050 : ["sk360","sk285","sk381","sk212","sk246","sk133","sk265","sk292","sk258","sk266","sk347","sk263","sk273","sk336","sk382","sk353","sk024","sk038","sk333"]
	}

	// アーク一覧
	const arcData = {
		"a001" : ["異国メグロナ","https://alpha-kimagureblog.xyz/lastcloudia/arc/megurona/"]
		,"a002" : ["空艇ロンヴァリオン","https://altema.jp/lastcloudia/ark/47"]
		,"a003" : ["屍山に立つ狂剣","https://alpha-kimagureblog.xyz/lastcloudia/arc/mad-sword/"]
		,"a004" : ["神獣ログ・メキア","https://altema.jp/lastcloudia/ark/78"]
		,"a005" : ["海賊船レグニス号","https://altema.jp/lastcloudia/ark/44"]
		,"a006" : ["冥皇門デスノーグ","https://altema.jp/lastcloudia/ark/55"]
		,"a007" : ["グラナ海の脅威","https://altema.jp/lastcloudia/ark/71"]
		,"a008" : ["導きの星鐘楼","https://altema.jp/lastcloudia/ark/80"]
		,"a009" : ["栄光のカルディナ","https://altema.jp/lastcloudia/ark/62"]
		,"a010" : ["蒼氷の守護騎士","https://alpha-kimagureblog.xyz/lastcloudia/arc/guardian-knight/"]
		,"a011" : ["聖夜の願い事","https://altema.jp/lastcloudia/ark/77"]
		,"a012" : ["星屑のLIVE","https://altema.jp/lastcloudia/ark/81"]
		,"a013" : ["超砂獣の霊帝牙","https://altema.jp/lastcloudia/ark/50"]
		,"a014" : ["大天使の微笑","https://altema.jp/lastcloudia/ark/52"]
		,"a015" : ["聖剣伝説2","https://altema.jp/lastcloudia/ark/64"]
		,"a016" : ["神獣を狩る者","https://altema.jp/lastcloudia/ark/42"]
		,"a017" : ["天弓スターロード","https://altema.jp/lastcloudia/ark/46"]
		,"a018" : ["ヴェル＝ジ＝オーグ","https://altema.jp/lastcloudia/ark/49"]
		,"a019" : ["秘奥録「灼鳳破」","https://altema.jp/lastcloudia/ark/54"]
		,"a020" : ["マジャ大神殿","https://altema.jp/lastcloudia/ark/58"]
		,"a021" : ["終末の命誓","https://altema.jp/lastcloudia/ark/60"]
		,"a022" : ["ゴルド戦争","https://altema.jp/lastcloudia/ark/79"]
		,"a023" : ["ゴーレム・コア","https://altema.jp/lastcloudia/ark/45"]
		,"a024" : ["聖剣伝説FF外伝","https://altema.jp/lastcloudia/ark/69"]
		,"a025" : ["古代兵器ローガーン","https://altema.jp/lastcloudia/ark/73"]
		,"a026" : ["ババラードの毒竜","https://altema.jp/lastcloudia/ark/75"]
		,"a027" : ["天聖女の凱旋","https://altema.jp/lastcloudia/ark/51"]
		,"a028" : ["深海の廃都ノノ・パクラ","https://altema.jp/lastcloudia/ark/65"]
		,"a029" : ["竜宝レイニクル","https://altema.jp/lastcloudia/ark/43"]
		,"a030" : ["魔獣ハンター","https://altema.jp/lastcloudia/ark/23"]
		,"a031" : ["邪教神殿/td>","https://altema.jp/lastcloudia/ark/37"]
		,"a032" : ["緋炎の英傑","https://altema.jp/lastcloudia/ark/26"]
		,"a033" : ["洞闇の酒坏","https://altema.jp/lastcloudia/ark/28"]
		,"a034" : ["天空城の雷神","https://altema.jp/lastcloudia/ark/29"]
		,"a035" : ["宝剣エリュード","https://altema.jp/lastcloudia/ark/33"]
		,"a036" : ["秘宝マルキュロディン","https://altema.jp/lastcloudia/ark/40"]
		,"a037" : ["ゼルエンの亡霊","https://altema.jp/lastcloudia/ark/61"]
		,"a038" : ["白騎士の休息","https://altema.jp/lastcloudia/ark/63"]
		,"a039" : ["乙女の祈り","https://altema.jp/lastcloudia/ark/25"]
		,"a040" : ["魔鏡ポムラム","https://altema.jp/lastcloudia/ark/30"]
		,"a041" : ["禁書の眠る祭壇","https://altema.jp/lastcloudia/ark/38"]
		,"a042" : ["剣聖墓メノン","https://altema.jp/lastcloudia/ark/27"]
		,"a043" : ["オルダーナ闘技場","https://altema.jp/lastcloudia/ark/53"]
		,"a044" : ["鏡鎧ミゼル","https://altema.jp/lastcloudia/ark/24"]
		,"a045" : ["グラン・バーガン","https://altema.jp/lastcloudia/ark/31"]
		,"a046" : ["聖旗ノルレアン","https://altema.jp/lastcloudia/ark/36"]
		,"a047" : ["聖剣伝説3","https://altema.jp/lastcloudia/ark/70"]
		,"a048" : ["海竜神殿グラナ・ダリア","https://altema.jp/lastcloudia/ark/39"]
		,"a049" : ["永久時計デ＝ロウ","https://altema.jp/lastcloudia/ark/41"]
		,"a050" : ["ポックルの隠れ里","https://altema.jp/lastcloudia/ark/56"]
		,"a051" : ["ブラッディムーン","https://altema.jp/lastcloudia/ark/32"]
		,"a052" : ["ゴルドの奇跡","https://altema.jp/lastcloudia/ark/35"]
		,"a053" : ["隠者の禁室","https://altema.jp/lastcloudia/ark/34"]
		,"a054" : ["ガイエスト修剣山","https://altema.jp/lastcloudia/ark/2"]
		,"a055" : ["ソーサラーエデン","https://altema.jp/lastcloudia/ark/11"]
		,"a056" : ["月下斬明","https://altema.jp/lastcloudia/ark/59"]
		,"a057" : ["リバラザードの生誕","https://altema.jp/lastcloudia/ark/74"]
		,"a058" : ["海岸線の破剣","https://altema.jp/lastcloudia/ark/3"]
		,"a059" : ["ファルニアの花","https://altema.jp/lastcloudia/ark/14"]
		,"a060" : ["ラドムーン賢封蹟","https://altema.jp/lastcloudia/ark/16"]
		,"a061" : ["人工エーテル","https://altema.jp/lastcloudia/ark/68"]
		,"a062" : ["焔鳥レミの卵","https://altema.jp/lastcloudia/ark/4"]
		,"a063" : ["聖火シュミライア","https://altema.jp/lastcloudia/ark/8"]
		,"a064" : ["白銀雪虹","https://altema.jp/lastcloudia/ark/10"]
		,"a065" : ["蜃気楼の砂塔","https://altema.jp/lastcloudia/ark/17"]
		,"a066" : ["雷宝石の光輝","https://altema.jp/lastcloudia/ark/20"]
		,"a067" : ["絶断門ベガンダ","https://altema.jp/lastcloudia/ark/9"]
		,"a068" : ["ジャイアント・ツリー","https://altema.jp/lastcloudia/ark/12"]
		,"a069" : ["異界次元の狭間","https://altema.jp/lastcloudia/ark/72"]
		,"a070" : ["アルダンの戦士","https://altema.jp/lastcloudia/ark/1"]
		,"a071" : ["蒼光騎士団","https://altema.jp/lastcloudia/ark/6"]
		,"a072" : ["フェアリーズフォレスト","https://altema.jp/lastcloudia/ark/7"]
		,"a073" : ["巨雷雲ゼラニア","https://altema.jp/lastcloudia/ark/21"]
		,"a074" : ["ポックルイーター","https://altema.jp/lastcloudia/ark/66"]
		,"a075" : ["白の研究所","https://altema.jp/lastcloudia/ark/19"]
		,"a076" : ["交易港グラナダ","https://altema.jp/lastcloudia/ark/5"]
		,"a077" : ["魔女が棲む家","https://altema.jp/lastcloudia/ark/13"]
		,"a078" : ["魔獣たちの秘湯","https://altema.jp/lastcloudia/ark/15"]
		,"a079" : ["クリスタルキャッスル","https://altema.jp/lastcloudia/ark/18"]
		,"a080" : ["死霊の大軍勢","https://altema.jp/lastcloudia/ark/82"]
	}
