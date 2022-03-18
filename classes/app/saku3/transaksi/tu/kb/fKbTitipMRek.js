window.app_saku3_transaksi_tu_kb_fKbTitipMRek = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tu_kb_fKbTitipMRek.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tu_kb_fKbTitipMRek";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form KasBank Penerimaan Titipan", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,11,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,430], childPage:["Data Jurnal","List Jurnal","Cari Data"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:9,tag:9,
					colTitle:["No Bukti","Tanggal","Jenis","No Dokumen","Akun Titipan","-","-","Deskripsi","Nilai"],
					colHide:[[5,6],[true,true]],
					colWidth:[[8,7,6,5,4,3,2,1,0],[80,200,150,80,80,120,60,60,100]],colFormat:[[8],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data Jurnal",click:[this,"doLoad3"]});		
		
		this.c_jenis = new saiCB(this.pc2.childPage[0],{bound:[20,11,200,20],caption:"Jenis",items:["BM"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc2.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		this.cb_titip = new saiCBBL(this.pc2.childPage[0],{bound:[20,14,220,20],caption:"Akun Titip", multiSelection:false, maxLength:10, tag:2});	
		this.e_detail = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,14,220,20],caption:"Total Detail", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				

		this.cb_agenda = new saiCBBL(this.pc2.childPage[0],{bound:[20,15,220,20],caption:"Agenda", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});				
		this.e_kb = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,15,220,20],caption:"Nilai Titip", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});				
		
		this.e_pp = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,14,450,20],caption:"PP", maxLength:50, readOnly:true});						
		this.e_debet = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,14,220,20],caption:"Total Debet", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.e_kredit = new saiLabelEdit(this.pc2.childPage[0],{bound:[770,17,220,20],caption:"Total Kredit", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});						
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,258], childPage:["Detail Rekening", "Item Jurnal"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:5,tag:0,
					colTitle:["Status", "Nama Rek","No Rek","Bank-Cabang","Nilai"],
					colWidth:[[4,3,2,1,0],[100,250,250,250,80]],					
					columnReadOnly:[true,[0,1,2,3],[4]],
					//readOnly:true,
					colFormat:[[4],[cfNilai]],checkItem: true,
					change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],dblClick:[this,"doDoubleClick"],
					buttonStyle:[[0],[bsAuto]], picklist:[[0],[new portalui_arrayMap({items:["APP","NONAPP"]})]],
					
					autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});		

		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:7,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai","Kode PP","Nama PP"],
					colWidth:[[6,5,4,3,2,1,0],[150,80,100,270,50,200,80]],					
					columnReadOnly:[true,[1,6],[0,2,3,4,5]],
					buttonStyle:[[0,2,5],[bsEllips,bsAuto,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					cellEnter:[this,"doCellEnter1"],ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});				
				
		this.e_ket2 = new saiLabelEdit(this.pc2.childPage[2],{bound:[20,15,450,20],caption:"No Dokumen",tag:9});		
		this.bCari = new button(this.pc2.childPage[2],{bound:[120,10,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		this.pc2.childPage[2].rearrangeChild(10, 23);	
					
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;			
			var data = this.dbLib.getDataProvider("select year(getdate()) as thn1, year(DATEADD(YEAR, -1, getdate())) as thn2",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.tahunFilter = "'"+line.thn1+"','"+line.thn2+"'";
				}
			}

			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
						
			this.cb_titip.setSQL("select a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
			                    "where b.kode_flag in ('047') and a.kode_lokasi='"+this.app._lokasi+"'",["kode_akun","nama"],false,["Kode","Nama"],"and","Data Akun Titipan",true);			
			
			this.dataPP = this.app._pp;						
			var sql = new server_util_arrayList();
			sql.add("select a.kode_akun,a.nama from masakun a "+
			        "where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'");									
			this.dbLib.getMultiDataProviderA(sql);
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tu_kb_fKbTitipMRek.extend(window.childForm);
window.app_saku3_transaksi_tu_kb_fKbTitipMRek.implement({	
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
	simpan: function(){			
		try{						
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from kas_titip where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("delete from it_aju_rek where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
						sql.add("update it_aju_rek set no_kastitip='-',nilai_balik=0 where no_kastitip='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					}					
					sql.add("insert into kas_titip (no_kas,kode_lokasi,akun_titip,keterangan,kode_pp,modul,periode,kode_curr,kurs,nilai,dc,kode_vendor, no_agenda) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBTITIP','"+this.e_periode.getText()+"','IDR',1,"+nilaiToFloat(this.e_debet.getText())+",'D','-', '"+this.cb_agenda.getText()+"')");
												
					sql.add("insert into kas_m (no_kas,kode_lokasi,no_dokumen,no_bg,akun_kb,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_app,tgl_input,nik_user,posted,no_del,no_link,ref1,kode_bank) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_agenda.getText()+"','-','"+this.cb_titip.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','KBTITIP','"+this.c_jenis.getText()+"','"+this.e_periode.getText()+"','IDR',1,"+parseNilai(this.e_debet.getText())+",'"+this.app._userLog+"','"+this.app._userLog+"',getdate(),'"+this.app._userLog+"','F','-','-','-','-')");
					sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
							"('"+this.e_nb.getText()+"','"+this.cb_agenda.getText()+"','"+this.dp_d1.getDateString()+"',999,'"+this.cb_titip.getText()+"','"+this.e_ket.getText()+"','C',"+nilaiToFloat(this.e_kb.getText())+",'"+this.app._kodePP+"','-','-','-','"+this.app._lokasi+"','KBTITIP','TITIP','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");										
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){
								sql.add("insert into kas_j(no_kas,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cf,ref1,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,kode_bank) values "+
										"('"+this.e_nb.getText()+"','"+this.cb_agenda.getText()+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.sg1.cells(0,i)+"','"+this.sg1.cells(3,i)+"','"+this.sg1.cells(2,i).toUpperCase()+"',"+nilaiToFloat(this.sg1.cells(4,i))+",'"+this.sg1.cells(5,i)+"','-','-','-','"+this.app._lokasi+"','KBTITIP','UMUM','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate(),'-')");
							}
						}
					}

					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i) && this.sg.cells(0,i) == "APP"){										
								sql.add("update it_aju_rek set no_kastitip='"+this.e_nb.getText()+"',nilai_balik="+nilaiToFloat(this.sg.cells(4,i))+" where no_rek='"+this.sg.cells(2,i)+"' and no_aju='"+this.cb_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
								sql.add("insert into it_aju_rek(no_aju,kode_lokasi,bank,no_rek,nama_rek,bank_trans,nilai,keterangan) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(1,i)+"','-',"+nilaiToFloat(this.sg.cells(4,i))+",'-')");																						
							}
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
					this.sg1.clear(1); this.sg3.clear(1); this.sg.clear(1); 						
					this.pc2.setActivePage(this.pc2.childPage[0]);					
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					setTipeButton(tbAllFalse);

					//var strSQL = "select a.no_aju,a.keterangan from it_aju_m a left join kas_titip b on a.no_aju=b.no_agenda and a.kode_lokasi=b.kode_lokasi and b.no_agenda<>'-' "+
					//			 "where b.no_kas is null and a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas<>'-' and substring(a.periode,1,4) in ("+this.tahunFilter+") union select '-','-'";
					var strSQL = "select a.no_aju,a.keterangan from it_aju_m a "+
						 "left join ( "+
						 "			select distinct no_aju,kode_lokasi "+
						 "			from it_aju_rek where (no_kastitip = '-' or no_kastitip is null) "+
						 "			and kode_lokasi='"+this.app._lokasi+"' "+
						 "			) b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas<>'-' and substring(a.periode,1,4) in ("+this.tahunFilter+") "+

						 "union select '-','-'" ;
	 				 this.cb_agenda.setSQL(strSQL,["a.no_aju","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Data Agenda",true);										
					
				break;
			case "simpan" :															
			case "ubah" :															
				this.preView = "1";								
				this.sg1.validasi();																
				for (var i=0;i < this.sg1.getRowCount();i++){					
					if (!this.sg1.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg1.getColCount();j++){
							if (this.sg1.cells(j,i) != "") {
								isKosong = false;
								break;
							}
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong di Tabel Jurnal.");
							return false;
						}
					}					
				}				
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);																									
				if (nilaiToFloat(this.e_kb.getText()) != nilaiToFloat(this.e_detail.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai Titip dan Total Detail tidak sama.");
					return false;						
				}

				if ((nilaiToFloat(this.e_kredit.getText()) + nilaiToFloat(this.e_kb.getText())) != nilaiToFloat(this.e_debet.getText())) {
					system.alert(this,"Transaksi tidak valid.","Nilai Titip,Total Debet dan Kredit tidak balance.");
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
				else 
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.preView = "0";
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}	
				else {	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from kas_m where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from kas_j where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from kas_titip where no_kas = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("delete from it_aju_rek where no_aju = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					sql.add("update it_aju_rek set no_kastitip='-',nilai_balik=0  where no_kastitip='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				}
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
		if (this.stsSimpan == 1) {
			this.doClick();				
			/*
			var strSQL = "select a.no_aju,a.keterangan from it_aju_m a left join kas_titip b on a.no_aju=b.no_agenda and a.kode_lokasi=b.kode_lokasi and b.no_agenda<>'-' "+
						 "where b.no_kas is null and a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas<>'-' and substring(a.periode,1,4) in ("+this.tahunFilter+") union select '-','-'";
			*/

			var strSQL = "select a.no_aju,a.keterangan from it_aju_m a "+
						 "left join ( "+
						 "			select distinct no_aju,kode_lokasi "+
						 "			from it_aju_rek where (no_kastitip = '-' or no_kastitip is null) "+
						 "			and kode_lokasi='"+this.app._lokasi+"' "+
						 "			) b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas<>'-' and substring(a.periode,1,4) in ("+this.tahunFilter+") "+

						 "union select '-','-'" ;
			this.cb_agenda.setSQL(strSQL,["a.no_aju","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Data Agenda",true);										
		}
	},
	doChange:function(sender){
		if ((sender == this.e_periode || sender == this.c_jenis) && this.stsSimpan ==1) this.doClick();					

		if (sender == this.cb_agenda && this.cb_agenda.getText()!="") {
			if (this.cb_agenda.getText()!="-") {
				var strSQL = "select a.kode_pp+' - '+b.nama as pp "+
							"from it_aju_m a "+
							"inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
							"where a.no_aju= '"+this.cb_agenda.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";

				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){					
						this.e_pp.setText(line.pp);
					}
				}

				if (this.stsSimpan == 1) {
					var data = this.dbLib.getDataProvider(
						"select * from it_aju_rek where (no_kastitip is null or no_kastitip='-') and no_aju='"+this.cb_agenda.getText()+"' and kode_lokasi='"+this.app._lokasi+"'"
					,true);

					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg.appendData(["NONAPP",line.nama_rek,line.no_rek,line.bank,floatToNilai(line.nilai)]);
						}
					} else this.sg.clear(1);	
				}

			}
			else  {
				this.e_pp.setText("-");
			}
		}
	},
	doClick:function(sender){
		if (this.e_periode.getText()!= "" && this.c_jenis.getText()!= "") {
			if (this.stsSimpan == 0) {					
				this.sg1.clear(1); this.sg3.clear(1); this.sg.clear(1); 						

				//var strSQL = "select a.no_aju,a.keterangan from it_aju_m a left join kas_titip b on a.no_aju=b.no_agenda and a.kode_lokasi=b.kode_lokasi and b.no_agenda<>'-' "+
				//		 	 "where b.no_kas is null and a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas<>'-' and substring(a.periode,1,4) in ("+this.tahunFilter+") union select '-','-'";
				var strSQL = "select a.no_aju,a.keterangan from it_aju_m a "+
						 "left join ( "+
						 "			select distinct no_aju,kode_lokasi "+
						 "			from it_aju_rek where (no_kastitip = '-' or no_kastitip is null) "+
						 "			and kode_lokasi='"+this.app._lokasi+"' "+
						 "			) b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas<>'-' and substring(a.periode,1,4) in ("+this.tahunFilter+") "+

						 "union select '-','-'" ;						 
				this.cb_agenda.setSQL(strSQL,["a.no_aju","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Data Agenda",true);										
							
			}
			this.stsSimpan = 1;
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"kas_m","no_kas",this.app._lokasi+"-"+this.c_jenis.getText()+this.e_periode.getText().substr(2,4)+".","0000"));						
			this.cb_titip.setFocus();
			setTipeButton(tbSimpan);			
		}		
	},	
	doChangeCell1: function(sender, col, row){
		if ((col == 2 || col == 4) && (this.sg1.cells(4,row) != "")) this.sg1.validasi();
		sender.onChange.set(undefined,undefined);	    
		if (col == 0) {
			if (this.sg1.cells(0,row) != "") {				
				var akun = this.dataAkun.get(sender.cells(0,row));				
				if (akun) sender.cells(1,row,akun);
				else {
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}		
		if (col == 5) {
			if (this.sg1.cells(5,row) != "") {
				var pp = this.dataPP.get(sender.cells(5,row));
				if (pp) sender.cells(6,row,pp);
				else {
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}				
			}
		}		
		sender.onChange.set(this,"doChangeCell1");		
	},
	doNilaiChange1: function(){
		try{
			var totD = totC = kb = 0;			
			for (var i = 0; i < this.sg1.rows.getLength();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != ""){
					if (this.sg1.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg1.cells(4,i));
					if (this.sg1.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg1.cells(4,i));
				}
			}
			this.e_debet.setText(floatToNilai(totD));
			this.e_kredit.setText(floatToNilai(totC));
			kb = Math.abs(totD-totC);
			this.e_kb.setText(floatToNilai(kb));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doCellEnter1: function(sender, col, row){
		switch(col){
			case 2 : 
					if (this.sg1.cells(2,row) == ""){
						this.sg1.setCell(2,row,"D");						
					}
				break;
			case 3 : 
					if (this.sg1.cells(3,row) == ""){
						if (row == 0) this.sg1.setCell(3,row,this.e_ket.getText());
						else this.sg1.setCell(3,row,this.sg1.cells(3,(row-1)) );
					}
				break;
			case 4 : 
					if (this.sg1.cells(4,row) == "" && row > 0) {
						var sls = nilaiToFloat(this.e_debet.getText()) - nilaiToFloat(this.e_kredit.getText());
						sls = Math.abs(sls); 
						this.sg1.setCell(4,row,sls);						
					}
				break;
			case 5 : 
					if (this.sg1.cells(5,row) == "") {
						if (row == 0) this.sg1.setCell(5,row,this.app._kodePP);
						else {
							this.sg1.setCell(5,row,this.sg1.cells(5,(row-1)));
							this.sg1.setCell(6,row,this.sg1.cells(6,(row-1)));
						}
					}
				break;							
		}
	},		
	doEllipsClick1: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select a.kode_akun,a.nama from masakun a "+							
							"where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							"select count(a.kode_akun) from masakun a where a.block= '0' and a.kode_lokasi = '"+this.app._lokasi+"'",
							["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
							"select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
							"select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
							["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}								
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doChangeCell: function(sender, col, row){						
		if (col == 0 || col == 4) {				
			this.sg.validasi();
		}
	},	
	doNilaiChange: function(){
		try{			
			var total = 0;			
			for (var i = 0; i < this.sg.rows.getLength();i++) {
				if (this.sg.rowValid(i) && this.sg.cells(0,i)=="APP" && this.sg.cells(4,i) != "") {
					total += nilaiToFloat(this.sg.cells(4,i));					
				}
			}			
			this.e_detail.setText(floatToNilai(Math.round(total * 100)/100));			
		}catch(e)
		{
			alert("[]"+e);
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(0,row) == "NONAPP") this.sg.cells(0,row,"APP");
		else this.sg.cells(0,row,"NONAPP");
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.preView == "1") {								
								this.nama_report="server_report_saku2_kopeg_kbitt_rptKbJurnalTuForm";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas='"+this.e_nb.getText()+"' ";
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
								this.pc2.hide();
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
							this.dataAkun = new portalui_arrayMap();														
							this.dataRek = new portalui_arrayMap();							
							this.dataCF = new portalui_arrayMap();							
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
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
				this.pc2.show();   
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
			this.sg1.clear(1); this.sg3.clear(1); 	this.sg.clear(1); 											
			this.pc2.setActivePage(this.pc2.childPage[0]);
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			setTipeButton(tbAllFalse);		
			//var strSQL = "select a.no_aju,a.keterangan from it_aju_m a left join kas_titip b on a.no_aju=b.no_agenda and a.kode_lokasi=b.kode_lokasi and b.no_agenda<>'-' "+
			//			 "where b.no_kas is null and a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas<>'-' and substring(a.periode,1,4) in ("+this.tahunFilter+") union select '-','-'";

			var strSQL = "select a.no_aju,a.keterangan from it_aju_m a "+
						 "left join ( "+
						 "			select distinct no_aju,kode_lokasi "+
						 "			from it_aju_rek where (no_kastitip = '-' or no_kastitip is null) "+
						 "			and kode_lokasi='"+this.app._lokasi+"' "+
						 "			) b on a.no_aju=b.no_aju and a.kode_lokasi=b.kode_lokasi "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' and a.no_kas<>'-' and substring(a.periode,1,4) in ("+this.tahunFilter+") "+

						 "union select '-','-'" ;

			this.cb_agenda.setSQL(strSQL,["a.no_aju","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Data Agenda",true);										
		} catch(e) {
			alert(e);
		}
	},
	doCari:function(sender){																									
		var filter = "";
		if (this.e_ket2.getText()!="") filter = " and a.no_dokumen like '%"+this.e_ket2.getText()+"%' ";		
		var strSQL = "select a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.jenis,a.no_dokumen,a.keterangan,a.nilai "+
		             "from kas_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.modul = 'KBTITIP' and a.posted ='F' " +filter;		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);					
		this.pc2.setActivePage(this.pc2.childPage[1]);
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_kas,convert(varchar,a.tanggal,103) as tgl,a.jenis,a.no_dokumen,a.keterangan,a.nilai,'-' as kode_vendor,b.akun_titip,'-' as nama_vendor "+
		             "from kas_m a "+				
					 "inner join kas_titip b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi "+					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F'";		
		var data = this.dbLib.getDataProvider(strSQL,true);
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU3 = data;
			this.sgn3.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn3.rearrange();
			this.doTampilData3(1);
		} else this.sg3.clear(1);			
	},
	doTampilData3: function(page) {
		this.sg3.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU3.rs.rows.length? this.dataJU3.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU3.rs.rows[i];													
			this.sg3.appendData([line.no_kas,line.tgl,line.jenis,line.no_dokumen,line.akun_titip,line.kode_vendor,line.nama_vendor,line.keterangan,floatToNilai(line.nilai)]); 
		}
		this.sg3.setNoUrut(start);
	},
	doPager3: function(sender, page) {
		this.doTampilData3(page);
	},
	doDoubleClick3: function(sender, col , row) {
		try{
			if (this.sg3.cells(0,row) != "") {
				this.pc2.setActivePage(this.pc2.childPage[0]);																		
				this.pc1.setActivePage(this.pc1.childPage[0]);																		
				setTipeButton(tbUbahHapus);
				this.stsSimpan = 0;				
				this.e_nb.setText(this.sg3.cells(0,row));								
								
				var strSQL = "select a.keterangan,a.no_dokumen,a.jenis,a.tanggal,a.akun_kb,b.no_agenda "+
							 "from kas_m a "+			
							 "inner join kas_titip b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi "+
							 "where a.no_kas = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);						
						this.e_ket.setText(line.keterangan);						
						this.c_jenis.setText(line.jenis);						
						this.cb_titip.setText(line.akun_kb);							

						var strSQL = "select a.no_aju,a.keterangan from it_aju_m a "+
									 "where a.no_aju='"+line.no_agenda+"' and a.kode_lokasi='"+this.app._lokasi+"' union select '-','-'";
						this.cb_agenda.setSQL(strSQL,["a.no_aju","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Data Agenda",true);										
						
						this.cb_agenda.setText(line.no_agenda);	

					}
				}												
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp "+
							"from kas_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"             inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+																				
							"where a.jenis = 'UMUM' and a.no_kas = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.no_urut",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp]);
					}
				} else this.sg1.clear(1);		
				
				
				var data = this.dbLib.getDataProvider("select * from it_aju_rek where no_aju='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];							
						this.sg.appendData(["APP",line.nama_rek,line.no_rek,line.bank,floatToNilai(line.nilai)]);
					}
				} else this.sg.clear(1);	


			}									
		} catch(e) {alert(e);}
	}
});