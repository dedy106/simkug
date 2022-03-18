window.app_saku2_transaksi_kopeg_sju_fPlacingIE2 = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_sju_fPlacingIE2.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_sju_fPlacingIE2";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Placing : Input/Edit", 0);	
		
		uses("saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;app_saku2_transaksi_kopeg_sju_fQuoValue;app_saku2_transaksi_kopeg_sju_fQuoViewer");		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,500], childPage:["Data Quotation","Data Placing","Data Draft","Filter Data","Additional Key"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:19,tag:9,
		            colTitle:["No Quotation","Status","Tanggal","Tertanggung","Unit","Acc Exec","Curr","Sum Insured","Premi","Brokerage","Tgl Mulai","Tgl Selesai","Occup. of Risk","Loc. of Risk","Obj. of Loss","% Premi","% Fee","No Draft","No Placing"],
					colWidth:[[18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0],[150,60,60,60,200,200,200,70,70,80,80,80,60,80,100,200,70,60,150]],
					readOnly:true,colFormat:[[7,8,9,15,16],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this.pc1.childPage[1],{bound:[20,12,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,12,100,18],selectDate:[this,"doSelectDate"]});		
		this.e_nb = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,420,20],caption:"No Placing", readOnly:true});				
		this.i_gen = new portalui_imageButton(this.pc1.childPage[1],{bound:[450,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.e_noquo = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,450,20],caption:"No Quotation", readOnly:true});
		this.e_tgl = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,11,450,20],caption:"Tgl Quotation", readOnly:true});
		this.e_cust = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,12,450,20],caption:"Tertanggung", readOnly:true});
		this.e_pp = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,12,450,20],caption:"Unit", readOnly:true});		
		this.e_pic = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,13,450,20],caption:"Acc Exec", readOnly:true});		
		this.e_objek = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,13,450,20],caption:"Object of Risk", maxLength:200});		
		this.e_occup = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,14,450,20],caption:"Occup. of Risk", maxLength:200 });				
		this.e_lokasi = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,14,450,20],caption:"Loc. of Risk", maxLength:200});		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[1],{bound:[20,11,100,18],caption:"Period of Insurance", underline:true});
		this.dp_mulai = new portalui_datePicker(this.pc1.childPage[1],{bound:[120,11,100,18]}); 		
		this.dp_selesai = new portalui_datePicker(this.pc1.childPage[1],{bound:[370,11,100,18]}); 				
		this.e_jenis = new saiLabelEdit(this.pc1.childPage[1],{bound:[520,11,450,20],caption:"Jenis Placing", readOnly:true,change:[this,"doChange"]});		
		this.c_curr = new saiCB(this.pc1.childPage[1],{bound:[20,14,200,20],caption:"Currency",readOnly:true,tag:2});		
		this.e_total = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,14,200,20],caption:"Sum Insured", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});						
		this.e_ppremi = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,16,200,20],caption:"% Premi", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_npremi = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,16,200,20],caption:"Nilai Premi", tag:1, tipeText:ttNilai, text:"0"});				
		this.i_hitung = new portalui_imageButton(this.pc1.childPage[1],{bound:[480,16,20,20],hint:"Hitung %",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitung"]});
		this.e_pfee = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,17,200,20],caption:"% Brokerage", tag:1, tipeText:ttNilai, text:"0",change:[this,"doChange"]});		
		this.e_nfee = new saiLabelEdit(this.pc1.childPage[1],{bound:[270,17,200,20],caption:"Brokerage", tag:1, tipeText:ttNilai, text:"0"});		
				
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,995,225],colCount:7,tag:0,
		            colTitle:["Kode","Nama Penanggung","Status"," % ","SumInsured","Premi","Brokerage"],
					colWidth:[[6,5,4,3,2,1,0],[80,80,100,50,100,300,80]],
					colFormat:[[3,4,5,6],[cfNilai,cfNilai,cfNilai,cfNilai]],					
					columnReadOnly:[true,[1],[0,2,3,4,5,6]],
					buttonStyle:[[0,2],[bsEllips,bsAuto]],picklist:[[2],[new portalui_arrayMap({items:["LEADER","MEMBER"]})]],checkItem:true,
					cellEnter:[this,"doCellEnter"],change:[this,"doChangeCell"],ellipsClick:[this,"doEllipsClick"],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,995],buttonStyle:2,grid:this.sg2});				
		
		this.mDesk = new tinymceCtrl(this.pc1.childPage[2],{bound:[20,13,800,500], withForm:false});
		
		this.c_status2 = new saiCB(this.pc1.childPage[3],{bound:[20,10,202,20],caption:"Status",items:["CL-APP","PLACING"], readOnly:true,tag:2});
		this.cb_cust2 = new portalui_saiCBBL(this.pc1.childPage[3],{bound:[20,12,202,20],caption:"Tertanggung",tag:9,multiSelection:false}); 		
		this.bCari = new button(this.pc1.childPage[3],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.sgA = new saiGrid(this.pc1.childPage[4],{bound:[1,10,800,this.pc1.height-45],colCount:3,tag:8,
		            colTitle:["Parameter","Deskripsi","Value"],colWidth:[[2,1,0],[670,80,0]],columnReadOnly:[true,[1,0,2],[]],buttonStyle:[[2],[bsEllips]],
					change:[this,"doChangeCell3"],ellipsClick:[this,"doEllipsClick"],autoAppend:true,defaultRow:1});
		this.sgnA = new portalui_sgNavigator(this.pc1.childPage[4],{bound:[1,this.pc1.height-45,800],buttonStyle:3,grid:this.sgA});								
		
		//------------- additional key
		this.frQuoValue = new app_saku2_transaksi_kopeg_sju_fQuoValue(this,{bound:[this.width / 2 - 250,this.height / 2 - 200,500,400], caption:"Parameter Tambahan", visible:false});
		this.frQuoValue.onSubmit.set(this,"doQuoValueSubmit");
		this.frQuoViewer = new app_saku2_transaksi_kopeg_sju_fQuoViewer(this,{bound:[this.width / 2 - 250,this.height / 2 - 200,500,400], caption:"Parameter Tambahan", visible:false});
		//-------------	
				
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);	
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		this.pc1.childPage[3].rearrangeChild(10, 23);	
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();		
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
		
			this.c_curr.items.clear();
			var data = this.dbLib.getDataProvider("select kode_curr from curr",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_curr.addItem(i,line.kode_curr);
				}
			}
			this.c_curr.setText("IDR");			
			this.cb_cust2.setSQL("select kode_cust, nama from sju_cust where kode_lokasi='"+this.app._lokasi+"'",["kode_cust","nama"],false,["Kode","Nama"],"and","Data Tertanggung",true);
												
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_sju_fPlacingIE2.extend(window.childForm);
window.app_saku2_transaksi_kopeg_sju_fPlacingIE2.implement({	
	mainButtonClick: function(sender, desk){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");			
	},
	doQuoValueSubmit: function(sender, code){
			this.sgA.cells(2,this.sgA.row, urlencode(code) );
	},
	simpan: function(){			
		try{		
			if (this.stsSimpan != "PLACING") this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();															
					if (this.stsSimpan == "PLACING") {
						sql.add("update sju_placing_m set no_placingseb='-' where no_placingseb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_placing_m where no_placing='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from sju_placing_d where no_placing='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");		
						sql.add("delete from sju_placing_draft where no_placing='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");	
						sql.add("delete from sju_placing_vendor where no_placing='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update sju_quo_m set progress='N',no_placing='-' where no_placing='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					}
					
					var progQuot = "2";
					var progPlacing = "0";
					
					sql.add("update a set no_placingseb ='"+this.e_nb.getText()+"' "+
					        "from sju_placing_m a inner join sju_placing_d b on a.no_placing=b.no_placing and a.kode_lokasi=b.kode_lokasi and a.no_placingseb='-' "+
							"where b.no_bukti ='"+this.e_noquo.getText()+"' and b.modul='PLACING' and b.kode_lokasi='"+this.app._lokasi+"'");							
					sql.add("update sju_quo_m set progress='"+progQuot+"',no_placing='"+this.e_nb.getText()+"' where no_quo='"+this.e_noquo.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
								
					//hitung ulang persentase
					var ppremi = nilaiToFloat(this.e_npremi.getText()) / nilaiToFloat(this.e_total.getText()) * 100;
					this.e_ppremi.setText(floatToNilai(ppremi));
					var pfee = nilaiToFloat(this.e_nfee.getText()) / nilaiToFloat(this.e_npremi.getText()) * 100;			
					this.e_pfee.setText(floatToNilai(pfee));
					
					sql.add("insert into sju_placing_m (no_placing,kode_vendor,tanggal,kode_lokasi,periode,nik_user,tgl_input,status,modul,no_placingseb,no_draft, occup,objek,lokasi,tgl_mulai,tgl_selesai,kode_curr,total,p_premi,n_premi,p_fee,n_fee,progress,no_polis,slip,kode_cust,cover,nilai_deduc,kode_tipe,kode_pp,kode_pic,jenis) values "+
						    "('"+this.e_nb.getText()+"','X','"+this.dp_d1.getDateString()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'PLACING','PLACING','-','-',  '"+this.e_occup.getText()+"','"+this.e_objek.getText()+"','"+this.e_lokasi.getText()+"','"+this.dp_mulai.getDateString()+"','"+this.dp_selesai.getDateString()+"','"+this.c_curr.getText()+"',"+nilaiToFloat(this.e_total.getText())+","+nilaiToFloat(this.e_ppremi.getText())+","+nilaiToFloat(this.e_npremi.getText())+","+nilaiToFloat(this.e_pfee.getText())+","+nilaiToFloat(this.e_nfee.getText())+",'"+progPlacing+"','-','"+urlencode(this.mDesk.getCode())+"','"+this.kodeCust+"','-',0,'"+this.kode_tipe+"','"+this.kode_pp+"','"+this.kode_pic+"','"+this.e_jenis.getText()+"')");					
					sql.add("insert into sju_placing_d (no_placing,status,modul,no_bukti,kode_lokasi,catatan) values "+
						    "('"+this.e_nb.getText()+"','"+progPlacing+"','PLACING','"+this.e_noquo.getText()+"','"+this.app._lokasi+"','-')");					
										
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){								
								sql.add("insert into sju_placing_vendor(no_placing,kode_lokasi,kode_vendor,persen,total,n_premi,n_fee,status) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"',"+nilaiToFloat(this.sg2.cells(3,i))+","+nilaiToFloat(this.sg2.cells(4,i))+","+nilaiToFloat(this.sg2.cells(5,i))+","+nilaiToFloat(this.sg2.cells(6,i))+",'"+this.sg2.cells(2,i)+"')");
							}
						}
					}
					for (var i=0;i < this.sgA.getRowCount();i++){
						if (this.sgA.rowValid(i)){			
							sql.add("insert into sju_placing_draft(no_placing, kode_lokasi, kunci, isi)"+
									"values('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sgA.cells(0,i)+"','"+this.sgA.cells(2,i)+"')");
						}
					}
					setTipeButton(tbAllFalse);					
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); 					
					this.doLoad();					
					this.pc1.setActivePage(this.pc1.childPage[0]);						
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :					
			case "ubah" :			
				this.preView = "1";
				var persen = sumInsur = premi = fee = 0;
				var stsLeader = 0;
				for (var i=0;i < this.sg2.getRowCount();i++){
					if (this.sg2.rowValid(i)){
						if (this.sg2.cells(2,i).toUpperCase() == "LEADER") stsLeader += 1;
						persen += nilaiToFloat(this.sg2.cells(3,i));
						sumInsur += nilaiToFloat(this.sg2.cells(4,i));
						premi += nilaiToFloat(this.sg2.cells(5,i));
						fee += nilaiToFloat(this.sg2.cells(6,i));
						for (var j=i;j < this.sg2.getRowCount();j++){
							if (this.sg2.cells(0,j) == this.sg2.cells(0,i) && (i != j)) {
							    var k = i+1;
								system.alert(this,"Transaksi tidak valid.","Duplikasi data penanggung untuk baris ["+k+"]");
								return false;
							}
						}
					}
				}
				if (this.e_jenis.getText() == "SINGLE") {
				if (persen != 100 || sumInsur != nilaiToFloat(this.e_total.getText()) || premi != nilaiToFloat(this.e_npremi.getText()) || fee != nilaiToFloat(this.e_nfee.getText())) {
					system.alert(this,"Transaksi tidak valid.","Rincian nilai penanggung dan rekap tidak sesuai.");
					return false;
				}
				}
				if (stsLeader != 1) {
					system.alert(this,"Transaksi tidak valid.","Status LEADER harus ada dan hanya satu.");
					return false;
				}
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);															
				var tglQuot = this.e_tgl.getText().substr(6,4) + "-" + this.e_tgl.getText().substr(3,2) + "-" + this.e_tgl.getText().substr(0,2);
				var data = this.dbLib.getDataProvider("select datediff(dd,'"+tglQuot+"','"+this.dp_d1.getDateString()+"') as sls ",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined && parseInt(line.sls)<0) {
						system.alert(this,"Transaksi tidak valid.","Tanggal Placing kurang dari Tanggal Quotation.");
						return false;
					}
				}
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :				
				this.preView = "0";
				uses("server_util_arrayList");
				var sql = new server_util_arrayList();								
				sql.add("update sju_placing_m set no_placingseb='-' where no_placingseb='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from sju_placing_m where no_placing='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				sql.add("delete from sju_placing_d where no_placing='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("delete from sju_placing_vendor where no_placing='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
				sql.add("update sju_quo_m set progress='N',no_placing='-' where no_placing='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
				setTipeButton(tbAllFalse);	
				this.dbLib.execArraySQL(sql);				
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}		
		this.doLoad();
	},	
	doClick:function(sender){
		if (this.stsSimpan != "PLACING") {
			if (this.e_noquo.getText()!="") {			
				var strSQL = "select kode_cust,kode_tipe,kode_pp from sju_quo_m where kode_lokasi='"+this.app._lokasi+"' and no_quo='"+this.e_noquo.getText()+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined) {
						this.kodetipe = line.kode_tipe;
						this.kodepp = line.kode_pp;
						this.kodeCust = line.kode_cust;
					}
				}	
				var AddFormat = "/PS."+this.kodetipe+"/"+this.kodepp+"/SJU/"+this.e_periode.getText().substr(2,2);
				var data = this.dbLib.getDataProvider("select isnull(max(substring(no_placing,0,30)),0) as no_placing from sju_placing_m where no_placing like '____"+AddFormat+"%' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						if (line.no_placing == "0") this.e_nb.setText("0001"+AddFormat);
						else {
							var idx = parseFloat(line.no_placing.substr(0,4)) + 1;
							idx = idx.toString();
							if (idx.length == 1) var nu = "000"+idx;
							if (idx.length == 2) var nu = "00"+idx;
							if (idx.length == 3) var nu = "0"+idx;
							if (idx.length == 4) var nu = idx;
							this.e_nb.setText(nu+AddFormat);
						}
					} 
				}
			}
		}
		else system.alert(this,"Status sudah PLACING.","Pilih data dengan status CL-APP untuk no placing baru.");
	},		
	doHitung:function(sender){		
		if (this.e_npremi.getText()!="" && this.e_total.getText()!="") {
			var ppremi = nilaiToFloat(this.e_npremi.getText()) / nilaiToFloat(this.e_total.getText()) * 100;
			this.e_ppremi.setText(floatToNilai(ppremi));
		}
		if (this.e_nfee.getText()!="" && this.e_npremi.getText()!="") {
			var pfee = nilaiToFloat(this.e_nfee.getText()) / nilaiToFloat(this.e_npremi.getText()) * 100;			
			this.e_pfee.setText(floatToNilai(pfee));
		}
	},
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {			
				this.pc1.setActivePage(this.pc1.childPage[1]);										
				this.stsSimpan = this.sg.cells(1,row);
				var sql = new server_util_arrayList();
				sql.add("select a.kode_vendor, a.nama from sju_vendor a inner join sju_quo_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+									  
					    "where b.no_quo ='"+this.sg.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'");			
				this.dbLib.getMultiDataProviderA(sql);
				
				this.e_noquo.setText(this.sg.cells(0,row));
				this.e_tgl.setText(this.sg.cells(2,row));
				this.e_cust.setText(this.sg.cells(3,row));
				this.e_pp.setText(this.sg.cells(4,row));				
				this.e_pic.setText(this.sg.cells(5,row));
				this.dp_mulai.setText(this.sg.cells(10,row));
				this.dp_selesai.setText(this.sg.cells(11,row));
				this.c_curr.setText(this.sg.cells(6,row));
				this.e_total.setText(this.sg.cells(7,row));
				this.e_npremi.setText(this.sg.cells(8,row));
				this.e_nfee.setText(this.sg.cells(9,row));
				this.e_ppremi.setText(this.sg.cells(15,row));
				this.e_pfee.setText(this.sg.cells(16,row));
				
				var strSQL = "select a.kode_cust,a.jenis,a.occup,a.lokasi,a.objek,a.slip,a.kode_pp,a.kode_tipe,a.kode_pic,no_placing from sju_quo_m a where a.no_quo='"+this.e_noquo.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			//a.nilai_deduc,a.cover,
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.mDesk.setCode(urldecode(line.slip));										
						this.e_occup.setText(line.occup);
						this.e_lokasi.setText(line.lokasi);
						this.e_objek.setText(line.objek);
						this.e_jenis.setText(line.jenis);
					
						this.kodeCust = line.kode_cust;
						this.kode_tipe = line.kode_tipe;
						this.kode_pp = line.kode_pp;
						this.kode_pic = line.kode_pic;
						if (line.no_placing!="-") this.e_nb.setText(line.no_placing);
						else this.e_nb.setText("");
						
					}
				}	
				
				if (this.stsSimpan != "PLACING") {
					this.doClick();
					setTipeButton(tbSimpan);
					
					var strSQL = "select count(*) as jml from sju_quo_vendor where no_quo='"+this.e_noquo.getText()+"' and kode_lokasi='"+this.app._lokasi+"'";			
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){							
							if (line.jml == 1) {
								var data = this.dbLib.getDataProvider("select b.kode_vendor,b.nama "+
											   "from sju_quo_vendor a inner join sju_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
											   "where a.no_quo='"+this.e_noquo.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
								if (typeof data == "object" && data.rs.rows[0] != undefined){
									var line;
									this.sg2.clear();
									for (var i in data.rs.rows){
										line = data.rs.rows[i];												
										this.sg2.appendData([line.kode_vendor,line.nama,"LEADER","100","0","0","0"]);
									}
								} else this.sg2.clear(1);														
								this.doChangeCell(this.sg2,3,0);		
							}
						}
					}	
					var data = this.dbLib.getDataProvider("select a.kode_kunci, c.nama, b.isi from sju_kunci_cob a "+
						" inner join sju_quo_draft b on b.kunci = a.kode_kunci "+
						" inner join sju_kunci c on c.kunci = a.kode_kunci "+
						" where b.no_quo = '"+this.e_noquo.getText()+"'  order by kode_kunci",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							this.sgA.clear();
							for (var i in data.rs.rows){
								var ln = data.rs.rows[i];												
								this.sgA.appendData([ln.kode_kunci, ln.nama, ln.isi]);
							}
							
						} else this.sgA.clear(1);	
						this.sgnA.setTotalPage(Math.ceil(this.sgA.getRowCount() / 20) );
						this.sgnA.rearrange();
				}
				else {
					setTipeButton(tbUbahHapus);					
					var strSQL = "select a.tgl_mulai, a.tgl_selesai,a.kode_curr,a.total,a.p_premi,a.n_premi,a.p_fee,a.n_fee "+
								"from sju_placing_m a inner join sju_quo_m b on a.no_placing=b.no_placing and a.kode_lokasi=b.kode_lokasi "+
					             "where b.no_quo='"+this.e_noquo.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";			
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object"){
						var line = data.rs.rows[0];							
						if (line != undefined){							
							this.dp_mulai.setText(line.tgl_mulai);
							this.dp_selesai.setText(line.tgl_selesai);
							this.c_curr.setText(line.kode_curr);
							this.e_total.setText(floatToNilai(line.total));
							this.e_npremi.setText(floatToNilai(line.n_premi));
							this.e_nfee.setText(floatToNilai(line.n_fee));
							this.e_ppremi.setText(floatToNilai(line.p_premi));
							this.e_pfee.setText(floatToNilai(line.p_fee));
						}
					}					
					var data = this.dbLib.getDataProvider("select b.kode_vendor,b.nama,a.persen,a.total,a.n_premi,a.n_fee,a.status "+
					   "from sju_placing_vendor a inner join sju_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi "+
					   "where a.no_placing = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg2.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];												
							this.sg2.appendData([line.kode_vendor, line.nama, line.status, floatToNilai(line.persen), floatToNilai(line.total), floatToNilai(line.n_premi), floatToNilai(line.n_fee)]);
						}
					} else this.sg2.clear(1);		
					var data = this.dbLib.getDataProvider("select a.kode_kunci, c.nama, b.isi from sju_kunci_cob a "+
						" inner join sju_placing_draft b on b.kunci = a.kode_kunci "+
						" inner join sju_kunci c on c.kunci = a.kode_kunci "+
						" where b.no_placing = '"+this.e_nb.getText()+"'  order by kode_kunci",true);
						if (typeof data == "object" && data.rs.rows[0] != undefined){
							this.sgA.clear();
							for (var i in data.rs.rows){
								var ln = data.rs.rows[i];												
								this.sgA.appendData([ln.kode_kunci, ln.nama, ln.isi]);
							}
							
						} else this.sgA.clear(1);	
						this.sgnA.setTotalPage(Math.ceil(this.sgA.getRowCount() / 20) );
						this.sgnA.rearrange();					
				}
			}
		} catch(e) {alert(e);}
	},
	doChange:function(sender){		
		if (sender == this.e_total && this.e_total.getText()!="") {
			if (this.e_ppremi.getText()!="") {
				var npremi = Math.round(nilaiToFloat(this.e_ppremi.getText())/100 * nilaiToFloat(this.e_total.getText()) * 100)/100;
				this.e_npremi.setText(floatToNilai(npremi));
				if (this.e_pfee.getText()!="" && this.e_npremi.getText()!="") {
					var nfee = Math.round(nilaiToFloat(this.e_pfee.getText())/100 * nilaiToFloat(this.e_npremi.getText()) * 100)/100;
					this.e_nfee.setText(floatToNilai(nfee));
				}
			}
		}		
		if (sender == this.e_ppremi && this.e_ppremi.getText()!="") {		
			var npremi = Math.round(nilaiToFloat(this.e_ppremi.getText())/100 * nilaiToFloat(this.e_total.getText()) * 100)/100;
			this.e_npremi.setText(floatToNilai(npremi));
		}
		if (sender == this.e_pfee && this.e_pfee.getText()!="" && this.e_npremi.getText()!="") {
			var nfee = Math.round(nilaiToFloat(this.e_pfee.getText())/100 * nilaiToFloat(this.e_npremi.getText()) * 100)/100;
			this.e_nfee.setText(floatToNilai(nfee));
		}		
		if (sender == this.c_jenis && this.c_jenis.getText()!="") {
			if (this.c_jenis.getText() == "SINGLE") {
				this.e_nilai.setTag(1);
				this.e_ppremi.setTag(1);
				this.e_npremi.setTag(1);
				this.e_pfee.setTag(1);
				this.e_nfee.setTag(1);
			}
			else {				
				this.e_nilai.setTag(9);
				this.e_ppremi.setTag(9);
				this.e_npremi.setTag(9);
				this.e_pfee.setTag(9);
				this.e_nfee.setTag(9);
			}
		}
	},	
	doLoad:function(sender){						
		var strSQL = "select a.no_quo,"+
		             "case a.progress when 'N' then 'CL-APP' "+
					 "end as status,convert(varchar,a.tanggal,103) as tanggal, d.kode_cust+'-'+d.nama as cust,b.kode_pp+'-'+b.nama as pp,c.kode_pic+'-'+c.nama as pic,a.kode_curr,a.total,a.n_premi,a.n_fee,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.occup,a.lokasi,a.objek,a.p_premi,a.p_fee,a.no_draft,a.no_placing "+
		             "from sju_quo_m a "+					 
		             "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
					 "inner join sju_pic c on a.kode_pic=c.kode_pic and a.kode_lokasi=c.kode_lokasi "+
					 "inner join sju_cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
					 "where a.periode<='"+this.e_periode.getText()+"' and a.progress = 'N' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_placing='-'";
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);			
	},	
	doCari:function(sender){						
		var filter = "";
		if (this.cb_cust2.getText()!="") filter = " and a.kode_cust='"+this.cb_cust2.getText()+"' ";		
		if (this.c_status2.getText() == "CL-APP") {
			var strSQL = "select a.no_quo,"+
						 "case a.progress when 'N' then 'CL-APP' "+
						 "end as status,convert(varchar,a.tanggal,103) as tanggal, d.kode_cust+'-'+d.nama as cust,b.kode_pp+'-'+b.nama as pp,c.kode_pic+'-'+c.nama as pic,a.kode_curr,a.total,a.n_premi,a.n_fee,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.occup,a.lokasi,a.objek,a.p_premi,a.p_fee,a.no_draft,a.no_placing "+
						 "from sju_quo_m a "+					 
						 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "inner join sju_pic c on a.kode_pic=c.kode_pic and a.kode_lokasi=c.kode_lokasi "+
						 "inner join sju_cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
						 "where a.periode<='"+this.e_periode.getText()+"' and a.progress = 'N' and a.kode_lokasi='"+this.app._lokasi+"' and a.no_placing='-' "+filter;
		}
		if (this.c_status2.getText() == "PLACING") {
			var strSQL = "select a.no_quo,"+
						 "case a.progress when '2' then 'PLACING' "+
						 "end as status,convert(varchar,a.tanggal,103) as tanggal, d.kode_cust+'-'+d.nama as cust,b.kode_pp+'-'+b.nama as pp,c.kode_pic+'-'+c.nama as pic,a.kode_curr,a.total,a.n_premi,a.n_fee,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,a.occup,a.lokasi,a.objek,a.p_premi,a.p_fee,a.no_draft,a.no_placing "+
						 "from sju_quo_m a "+					 
						 "inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
						 "inner join sju_pic c on a.kode_pic=c.kode_pic and a.kode_lokasi=c.kode_lokasi "+
						 "inner join sju_cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi "+
						 "left join sju_polis_m e on a.no_placing=e.no_placing and a.kode_lokasi=e.kode_lokasi "+
						 "where e.no_placing is null and a.periode<='"+this.e_periode.getText()+"' and a.progress = '2' and a.kode_lokasi='"+this.app._lokasi+"' "+filter; 
		}					 
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn.rearrange();
			this.doTampilData(1);
		} else this.sg.clear(1);
		this.pc1.setActivePage(this.pc1.childPage[0]);		
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.no_quo,line.status.toUpperCase(),line.tanggal,line.cust,line.pp,line.pic,line.kode_curr,floatToNilai(line.total),floatToNilai(line.n_premi),floatToNilai(line.n_fee),line.tgl_mulai,line.tgl_selesai,line.occup,line.lokasi,line.objek,floatToNilai(line.p_premi),floatToNilai(line.p_fee),line.no_draft,line.no_placing]); 
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){							
							if (this.preView == "1") {
								this.nama_report="server_report_saku2_kopeg_sju_rptPrPlacing";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_placing='"+this.e_nb.getText()+"' ";
								this.filter2 = "";
								this.viewer.prepare();
								this.viewer.setVisible(true);
								this.app._mainForm.pButton.setVisible(false);
								this.app._mainForm.reportNavigator.setVisible(true);
								this.viewer.setTotalPage(this.report.getTotalPage(this.nama_report,this.filter,1,this.filter2));
								this.app._mainForm.reportNavigator.setTotalPage(this.viewer.getTotalPage());
								this.app._mainForm.reportNavigator.rearrange();
								this.showFilter = undefined;
								this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter, 1,  1, this.showFilter, this.app._namalokasi,this.filter2));
								this.page = 1;
								this.allBtn = false;			
								this.pc1.hide();   
							}
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							}
						}
						else {													
							if (result.toLowerCase().search("primary key") == -1){
								alert(error);
							}
							else this.simpan();						   						
						}
	    			break;					
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataVendor = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataVendor.set(line.kode_vendor, line.nama);										
								}								
							}							
						}else throw result;
					break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},
	doCloseReportClick: function(sender){
		switch(sender.getName()){
			case "PreviewBtn" :        
				window.open(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
			break;
			case "PrintBtn" :
				this.viewer.useIframe(this.report.previewWithHeader(this.nama_report,this.filter,1,1, this.showFilter,this.app._namalokasi,this.filter2));
				try
				{
					window.frames[this.viewer.getFullId() +"_iframe"].focus();
					window.frames[this.viewer.getFullId() +"_iframe"].print();
				}catch(e)
				{alert(e);}
			break;
			default :				
				this.pc1.show();   
				this.viewer.setVisible(false);
				this.app._mainForm.pButton.setVisible(true);
				this.app._mainForm.reportNavigator.setVisible(false);  
				this.clearLayar();				
			break;
		}
	},
	clearLayar : function(){
		try {
			this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
			this.sg.clear(1); this.sg2.clear(1); 
			this.doLoad();					
			this.pc1.setActivePage(this.pc1.childPage[0]);				
			setTipeButton(tbAllFalse);
		} catch(e) {
			alert(e);
		}
	},
	doChangeCell: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (sender.cells(0,row) != "") {
				var vendor = this.dataVendor.get(sender.cells(0,row));
				if (vendor) sender.cells(1,row,vendor);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Penanggung "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}			
		if (col == 3 && sender.cells(3,row) !="") {
			var sumInsured = Math.round(nilaiToFloat(sender.cells(3,row))/100 * nilaiToFloat(this.e_total.getText()) * 100)/100;
			var premi = Math.round(nilaiToFloat(sender.cells(3,row))/100 * nilaiToFloat(this.e_npremi.getText()) * 100)/100;
			var fee = Math.round(nilaiToFloat(sender.cells(3,row))/100 * nilaiToFloat(this.e_nfee.getText()) * 100)/100;
			
			sender.cells(4,row,parseFloat(sumInsured));
			sender.cells(5,row,parseFloat(premi));
			sender.cells(6,row,parseFloat(fee));
		}
		sender.onChange.set(this,"doChangeCell");		
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg2) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Penanggung",sender,undefined, 
								"select a.kode_vendor, a.nama from sju_vendor a inner join sju_quo_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi where b.no_quo ='"+this.e_noquo.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",
								"select count(a.kode_vendor) from sju_vendor a inner join sju_quo_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi where b.no_quo ='"+this.e_noquo.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",
								["a.kode_vendor","a.nama"],"and",["Kode","Nama"],false);				
				}		
				
			}		
			if (sender == this.sgA){
				if (col == 2){
					this.frQuoValue.setTop(this.height / 2 - 200);
					this.frQuoValue.setLeft(this.width / 2 - 250);
					this.frQuoValue.show();
					this.frQuoValue.bringToFront();
					this.frQuoValue.mDesk.setCode(urldecode(this.sgA.cells(2, row)) );
				}
				if (col == 0){
					this.standarLib.ListDataSGFilter(this, "Data Lokasi",this.sgA, this.sgA.row, this.sgA.col,
											 "select kunci,nama from sju_kunci ",
												  "select count(*)  from sju_kunci ",
												  ["kunci","nama"],"where",["Kunci","Nama"]);
				}
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doCellEnter: function(sender, col, row){
		switch(col){			
			case 3 : 
					if (this.sg2.cells(3,row) == "" && row == 0) {						
						this.sg2.setCell(3,row,"100");
					}
				break;			
		}
	}
});