window.app_saku2_transaksi_aka_fRekonBatalLoadxml = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_aka_fRekonBatalLoadxml.prototype.parent.constructor.call(this, owner);
		this.className = "app_saku2_transaksi_aka_fRekonBatalLoadxml";
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Load Data Tagihan Batal: Proses", 0);	
		
		this.maximize();		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator;portalui_saiMemo");
		uses("portalui_saiGrid",true);		
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Load", readOnly:true});					
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,13,450,20],caption:"Deskripsi", maxLength:150});			
		this.cb_akun = new saiCBBL(this,{bound:[20,18,200,20],caption:"Akun Pembatalan", multiSelection:false, maxLength:10, tag:2 });
		this.cb_pp = new saiCBBL(this,{bound:[20,14,200,20],caption:"PP", multiSelection:false, maxLength:10, tag:2});
		this.cb_drk = new saiCBBL(this,{bound:[20,15,200,20],caption:"DRK", multiSelection:false, maxLength:10, tag:2});		
		this.bUpload = new portalui_uploader(this,{bound:[515,15,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});		
		this.bCek = new button(this,{bound:[615,15,80,18],caption:"Validasi",click:[this,"doCek"]});
		this.e_total = new saiLabelEdit(this,{bound:[720,15,200,20],caption:"Total", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,330], childPage:["Data Invoice Batal","Pesan Kesalahan"]});				
		this.sg1 = new portalui_saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:7,tag:9,
				colTitle:["Periode","NIM","Nama","Kode Produk","Akun Piutang","Nilai","No Invoice"],
				colWidth:[[6,5,4,3,2,1,0],[150,100,80,80,300,100,80]],
				colFormat:[[5],[cfNilai]],
				readOnly:true, defaultRow:1
		});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3, grid:this.sg1, pager:[this,"selectPage"]});		
		this.e_memo = new saiMemo(this.pc1.childPage[1],{bound:[5,14,690,280],labelWidth:0,tag:9,readOnly:true});		
		this.bRefresh = new portalui_imageButton(this.sgn,{bound:[this.sgn.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Clear",click:[this,"doClick"]});
		this.sgn.uploader.setParam3("object");
		this.sg1.setAllowBlank(true);
		this.setTabChildIndex();
		
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		this.rearrangeChild(10,23);
		
		this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
		this.cb_pp.setSQL("select kode_pp, nama from pp where tipe ='posting' and flag_aktif ='1' and kode_lokasi='"+this.app._lokasi+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data Pusat Pertanggungjawaban",true);		
		this.cb_akun.setSQL("select kode_akun, nama from masakun where kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Daftar Akun Pembatalan",true);
		setTipeButton(tbAllFalse);	

		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
	}
};
window.app_saku2_transaksi_aka_fRekonBatalLoadxml.extend(window.portalui_childForm);
window.app_saku2_transaksi_aka_fRekonBatalLoadxml.implement({
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.stsTampil = "LOAD";
			this.dataUpload = data;
			if (result) {								
				this.sg1.clear();				
				this.selectPage(undefined, 1);
				this.sgn.setTotalPage(Math.ceil(this.dataUpload.rows.length / 20));				
				this.sgn.rearrange();
				this.sgn.activePage = 0;								
			}else throw(data);							
   		}catch(e){
   		   this.sg1.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},
	selectPage: function(sender,page){
		if (this.stsTampil == "LOAD") {
			var start = (page - 1) * 20;
			var finish = start + 20;
			finish = (finish > this.dataUpload.rows.length ? this.dataUpload.rows.length : finish);
			this.sg1.clear();
			for (var i=start; i < finish;i++){
				line = this.dataUpload.rows[i];			
				this.sg1.appendData([line.periode,line.nim,line.nama,line.kode_produk,"-","0","-"]);
			}
			this.sg1.setNoUrut(start);
		}
		else {
			this.sg1.clear();
			var line;
			this.page = page;
			var start = (page - 1) * 20;
			var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
			for (var i=start;i<finish;i++){
				line = this.dataJU.rs.rows[i];							
				this.sg1.appendData([line.periode,line.nim,line.nama,line.kode_produk,line.akun_piutang,floatToNilai(line.nilai),line.no_inv]);
			}
		}
	},
	doCek:function(sender){										
		try {	
			this.stsSimpan = "0";
			var line; var strSQL = "";
			uses("server_util_arrayList");
			var sql = new server_util_arrayList();																																														
			sql.add("delete from aka_billbtl_load where nik_user = '"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'");			
			
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];
				sql.add("insert into aka_billbtl_load(nik_user,kode_lokasi,no_inv,nim,nama,kode_produk,akun_piutang,nilai,periode) values "+
						"('"+this.app._userLog+"','"+this.app._lokasi+"','-','"+line.nim+"','"+line.nama+"','"+line.kode_produk+"','-',0,'"+line.periode+"')");
			}												
			sql.add("update a set a.akun_piutang=b.akun_piutang,a.nilai=(b.nilai-isnull(x.tot_batal,0)-isnull(c.tot_lunas,0)),a.no_inv=b.no_inv "+
			        "from aka_billbtl_load a inner join aka_bill_d b on a.periode=b.periode and a.kode_lokasi=b.kode_lokasi and a.kode_produk=b.kode_produk and a.nim=b.nim "+					
					"      left join (select no_inv,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_lunas "+
					"                 from aka_rekon_d group by no_inv,kode_produk,kode_lokasi) c on b.no_inv=c.no_inv and b.kode_produk=c.kode_produk and c.kode_lokasi=b.kode_lokasi "+
					"      left join (select no_inv,kode_produk,kode_lokasi,sum(case dc when 'D' then nilai else -nilai end) as tot_batal "+
					"                 from aka_batal_d group by no_inv,kode_produk,kode_lokasi) x on b.no_inv=x.no_inv and b.kode_produk=x.kode_produk and b.kode_lokasi=x.kode_lokasi "+
					"where a.nik_user = '"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"'");						
			this.dbLib.execArraySQL(sql);						
						
			strSQL = "select sum(nilai) as total from aka_billbtl_load  where nik_user = '"+this.app._userLog+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined) this.e_total.setText(floatToNilai(line.total));				
			}
			var temu = false; var msg  = ""; this.e_memo.setText("");			
			strSQL = "select no_inv from aka_billbtl_load where akun_piutang='-' and nilai=0 and nik_user = '"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'";						
			var data = this.dbLib.getDataProvider(strSQL,true);	
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;				
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					temu = true;
					msg+= "No Invoice tidak terdaftar. [kode : "+line.no_inv+"]\n";
				}
			}						
			if (!temu) {						
				setTipeButton(tbSimpan);
				this.stsTampil = "HITUNG";			
				strSQL = "select * from aka_billbtl_load where nik_user = '"+this.app._userLog+"'";
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();				
					this.selectPage(undefined, 1);		
				} else this.sg1.clear(1);								
			}
			else {				
				this.e_memo.setText(msg);
				setTipeButton(tbAllFalse);
				system.alert(this,"Transaksi tidak valid.","Lihat daftar kesalahan.");
				this.pc1.setActivePage(this.pc1.childPage[1]);
			}
		} catch(e) { 
			alert(e);
		}
	},
	mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");		
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");		
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");		
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");		
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk){
					this.standarLib.clearByTag(this, [0,1],undefined);				
					this.sg1.clear(1); 
					setTipeButton(tbSimpan);
					this.pc1.setActivePage(this.pc1.childPage[0]);
				}
				break;
			case "simpan" :	
					this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
					if (nilaiToFloat(this.e_total.getText()) <= 0) {
						system.alert(this,"Transaksi tidak valid.","Total tidak boleh nol atau kurang.");
						return false;						
					}
					if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
						system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
					if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())){
						if (this.app._pernext == "1")
						  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
						else{
							system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
							return false;
						}
					}
					this.stsSimpan = "1";					
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_rekon_m","no_rekon",this.app._lokasi+"-RBIL"+this.e_periode.getText().substr(2,4)+".","000"));
					if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
						try{
							uses("server_util_arrayList");
							var sql = new server_util_arrayList();	
							sql.add("insert into aka_rekon_m(no_rekon,no_dokumen,tanggal,keterangan,nilai,posted,modul,akun_titip,nim,nik_buat,nik_app,kode_lokasi,periode,nik_user,tgl_input) values "+
									"('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',"+parseNilai(this.e_total.getText())+",'F','REV','"+this.cb_akun.getText()+"','-','"+this.app._userLog+"','"+this.app._userLog+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate())");
							
							sql.add("insert into aka_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
									"	('"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',0,'"+this.cb_akun.getText()+"','"+this.e_ket.getText()+"','D',"+parseNilai(this.e_total.getText())+",'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"','"+this.app._lokasi+"','BTLLOAD','BATAL','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
							sql.add("insert into aka_rekon_j(no_rekon,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) "+
									"select '"+this.e_nb.getText()+"','-','"+this.dp_d1.getDateString()+"',1,akun_piutang,'"+this.e_ket.getText()+"','C',sum(nilai),'"+this.cb_pp.getText()+"','"+this.cb_drk.getText()+"',kode_lokasi,'BTLLOAD','PIU','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate() "+
									"from aka_billbtl_load where nik_user = '"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"' group by akun_piutang,kode_lokasi ");										
							
							for (var i=0;i<this.dataJU.rs.rows.length;i++){
								line = this.dataJU.rs.rows[i];							
								sql.add("insert into aka_rekon_d(no_rekon,nim,no_inv,periode,nilai,kode_lokasi,akun_titip,akun_piutang,kode_produk,dc,modul,id_bank) values "+
										"('"+this.e_nb.getText()+"','"+line.nim+"','"+line.no_inv+"','"+this.e_periode.getText()+"',"+line.nilai+",'"+this.app._lokasi+"','"+this.cb_akun.getText()+"','"+line.akun_piutang+"','"+line.kode_produk+"','C','BTLLOAD','-')");
							}							
							setTipeButton(tbAllFalse);
							this.dbLib.execArraySQL(sql);
						}catch(e){
							systemAPI.alert(e);
						}
					}
				break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText("");
	},	
	doChange: function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="")
			this.cb_drk.setSQL("select kode_drk, nama from drk where tipe ='posting' and kode_lokasi='"+this.app._lokasi+"' and tahun = '"+this.e_periode.getText().substr(0,4)+"' ",["kode_drk","nama"],false,["Kode","Nama"],"and","Data DRK",true);
	},
	doClick: function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"aka_rekon_m","no_rekon",this.app._lokasi+"-RBIL"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_ket.setFocus();
		}
		if (sender == this.bRefresh) this.sg1.clear(1);
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			switch(methodName){
				case "execArraySQL":					
					if (result.toLowerCase().search("error") == -1){
						if (this.stsSimpan=="1") {
							this.nama_report="server_report_saku2_aka_...";
							this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_rekon='"+this.e_nb.getText()+"' ";
							this.filter = this.filter2;
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
					}else
						system.info(this, result,"");											
				break;
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
			this.standarLib.clearByTag(this, [0,1],undefined);				
			this.sg1.clear(1); 
			setTipeButton(tbSimpan);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
		} catch(e) {
			alert(e);
		}
	}
});
