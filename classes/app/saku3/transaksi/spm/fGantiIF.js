window.app_saku3_transaksi_spm_fGantiIF = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_spm_fGantiIF.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_spm_fGantiIF";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penggatian Kuitansi", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,13,200,20],caption:"Periode",tag:2,readOnly:true, visible:false,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,13,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,13,98,18],selectDate:[this,"doSelectDate"]}); 		
		
		this.pc2 = new pageControl(this,{bound:[10,10,1000,440], childPage:["Data Pengajuan","List Pengajuan"]});		
		this.sg3 = new saiGrid(this.pc2.childPage[1],{bound:[1,5,this.pc2.width-5,this.pc2.height-30],colCount:4,tag:9,
		            colTitle:["No Bukti","Tanggal","Deskripsi","Nilai"],
					colWidth:[[3,2,1,0],[100,410,80,100]],colFormat:[[3],[cfNilai]],readOnly:true,
					dblClick:[this,"doDoubleClick3"],autoAppend:false,defaultRow:1});		
		this.sgn3 = new portalui_sgNavigator(this.pc2.childPage[1],{bound:[1,this.pc2.height-25,this.pc2.width-1,25],buttonStyle:3,grid:this.sg3,pager:[this,"doPager3"]});
		this.bLoad3 = new portalui_imageButton(this.sgn3,{bound:[this.sgn3.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load Data",click:[this,"doLoad3"]});		
		
		this.e_nb = new portalui_saiLabelEdit(this.pc2.childPage[0],{bound:[10,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true,visible:false});		
		this.cb_nik = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[10,12,220,20],caption:"Pemegang IF",tag:2,multiSelection:false,change:[this,"doChange"]}); 						
		this.e_saldo = new saiLabelEdit(this.pc2.childPage[0],{bound:[10,14,200,20],caption:"Saldo IF", tag:1, tipeText:ttNilai, text:"0",readOnly:true});		
		this.cb_pp = new portalui_saiCBBL(this.pc2.childPage[0],{bound:[10,13,220,20],caption:"PP",tag:2,readOnly:true}); 										
		this.e_ket = new saiLabelEdit(this.pc2.childPage[0],{bound:[10,16,550,20],caption:"Uraian", maxLength:150});					
		this.e_total = new saiLabelEdit(this.pc2.childPage[0],{bound:[790,16,200,20],caption:"Total", tag:1, tipeText:ttNilai, text:"0",readOnly:true});
		
		this.pc1 = new pageControl(this.pc2.childPage[0],{bound:[1,12,995,310], childPage:["Item Pertanggungan","Data Anggaran"]});		
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:10,tag:0,
		            colTitle:["Kode MTA","Nama MTA","DC","Keterangan","Nilai","Kode PP","Nama PP","Tgl Kuitansi","Kode Proyek","Deskripsi"],
					colWidth:[[9,8,7,6,5,4,3,2,1,0],[150,80,80,150,80,100,270,50,200,80]],					
					columnReadOnly:[true,[1,6,9],[0,2,3,4,5,7,8]],
					buttonStyle:[[0,2,5,7,8],[bsEllips,bsAuto,bsEllips,bsDate,bsEllips]], 
					colFormat:[[4],[cfNilai]],picklist:[[2],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					cellEnter:[this,"doCellEnter1"],ellipsClick:[this,"doEllipsClick1"],change:[this,"doChangeCell1"],nilaiChange:[this,"doNilaiChange1"],
					autoAppend:true,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});		
		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:7,tag:9,
		            colTitle:["Kode MTA","Nama MTA","Kode PP","Nama PP","Saldo Awal","Nilai","Saldo Akhir"],
					colWidth:[[6,5,4,3,2,1,0],[100,100,100,200,80,200,80]],
					readOnly:true,colFormat:[[4,5,6],[cfNilai,cfNilai,cfNilai]],autoAppend:true,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		this.i_budget = new portalui_imageButton(this.sgn2,{bound:[955,2,20,20],hint:"Cek Anggaran",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doHitungGar"]});
		
		this.rearrangeChild(10, 23);
		this.pc2.childPage[0].rearrangeChild(10, 23);	
		
		uses("server_report_report;portalui_reportViewer");
		this.viewer = new portalui_reportViewer(this, {bound:[0,0,this.getWidth(), this.getHeight()],visible:false});
		this.viewer.hide();
		this.app._mainForm.initReport(this, this.viewer,"doSelectedPage","doCloseReportClick", "doRowPerPageChange", "doPdfClick","doXlsClick",true);
		this.report = new server_report_report();
		this.report.addListener(this);
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();				
		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);			
			this.rootDir = this.app._rootDir;
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			
			this.flagGarFree = "0"; this.flagDokFree = "0"; 
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('GARFREE','DOKFREE','SPMHUTIF') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																	
					if (line.kode_spro == "GARFREE") this.flagGarFree = line.flag;			
					if (line.kode_spro == "DOKFREE") this.flagDokFree = line.flag;								
					if (line.kode_spro == "SPMHUTIF") this.akunHutIF = line.flag;								
				}
			}
			
			this.cb_pp.setSQL("select a.kode_pp, a.nama from pp a inner join karyawan_pp d on a.kode_pp = d.kode_pp and a.kode_lokasi=d.kode_lokasi and d.nik='"+this.app._userLog+"' "+
							  "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["a.kode_pp","a.nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);
			
			this.cb_nik.setSQL("select a.nik, a.nama from karyawan a inner join spm_if_m b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.flag_aktif='1'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Pemegang",true);
			this.cb_nik.setText(this.app._userLog);			
			
			var sql = new server_util_arrayList();			
			sql.add("select distinct a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
					//"       inner join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.periode like '"+this.e_periode.getText().substr(0,4)+"%' "+
					//"       inner join karyawan_pp d on c.kode_pp = d.kode_pp and c.kode_lokasi=d.kode_lokasi and d.nik='"+this.cb_nik.getText()+"' "+
					"where b.kode_flag in ('041') and a.kode_lokasi='"+this.app._lokasi+"' ");
			sql.add("select a.kode_pp,a.nama from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.app._userLog+"' and a.flag_aktif= '1' and a.kode_lokasi = '"+this.app._lokasi+"'");
			sql.add("select kode_proyek,nama from spm_proyek where flag_aktif= '1' and kode_lokasi = '"+this.app._lokasi+"' union select '-','-'");
			this.dbLib.getMultiDataProviderA(sql);			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_spm_fGantiIF.extend(window.childForm);
window.app_saku3_transaksi_spm_fGantiIF.implement({	
	doAfterLoad:  function(sender, result, data, filename){
		try{
			if (result) this.e_file.setText(data.filedest);
			this.dataUpload = data;
			if (this.dataUpload.temporary !== undefined) this.dataUpload.temporary += ";";
			else this.dataUpload.temporary = "";
			this.dataUpload.temporary += this.rootDir+"/"+this.uploader.param2 +this.dataUpload.tmpfile;
		}catch(e){
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
	simpan: function(){			
		try{						
			if (this.stsSimpan == 1) this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					if (this.stsSimpan == 0) {
						sql.add("delete from spm_ifganti_m where no_ganti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from spm_ifganti_j where no_ganti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
						sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");						
					}
					
					sql.add("insert into spm_ifganti_m(no_ganti,kode_lokasi,nik,periode,tanggal,modul,kode_akun,kode_pp,keterangan,nilai,tgl_input,no_reim,progress,user_input,posted) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_nik.getText()+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','IFGANTI','"+this.akunHutIF+"','"+this.cb_pp.getText()+"','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",getdate(),'-','0','"+this.app._userLog+"','F')");
					
					sql.add("insert into spm_ifganti_j(no_ganti,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis,tgl_bukti,modul,nik_user,tgl_input,kode_proyek) values "+
							"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',998,'"+this.e_periode.getText()+"','"+this.akunHutIF+"','"+this.cb_pp.getText()+"','-','C','"+this.e_ket.getText()+"',"+nilaiToFloat(this.e_total.getText())+",'HUTIF','"+this.dp_d1.getDateString()+"','IFGANTI','"+this.app._userLog+"',getdate(),'-')");
					
					if (this.sg1.getRowValidCount() > 0){
						for (var i=0;i < this.sg1.getRowCount();i++){
							if (this.sg1.rowValid(i)){								                           
								sql.add("insert into spm_ifganti_j(no_ganti,no_ref,kode_lokasi,tanggal,nu,periode,kode_akun,kode_pp,kode_drk,dc,keterangan,nilai,jenis,tgl_bukti,modul,nik_user,tgl_input,kode_proyek) values "+
										"('"+this.e_nb.getText()+"','-','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"',"+i+",'"+this.e_periode.getText()+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(5,i)+"','-','"+this.sg1.cells(2,i).toUpperCase()+"','"+this.sg1.cells(3,i)+"',"+nilaiToFloat(this.sg1.cells(4,i))+",'BEBAN','"+this.sg1.getCellDateValue(7,i)+"','IFGANTI','"+this.app._userLog+"',getdate(),'"+this.sg1.cells(8,i)+"')");
							}
						}
					}
													
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								if (nilaiToFloat(this.sg2.cells(5,i)) > 0) {
									var DC = "D"; 
									var nilai = nilaiToFloat(this.sg2.cells(5,i));
								} else {
									var DC = "C";
									var nilai = nilaiToFloat(this.sg2.cells(5,i)) * -1;
								}
								sql.add("insert into angg_r(no_bukti,modul,kode_lokasi,kode_akun,kode_pp,kode_drk,periode1,periode2,dc,saldo,nilai) values "+
										"('"+this.e_nb.getText()+"','IFGANTI','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','"+this.sg2.cells(2,i)+"','-','"+this.e_periode.getText()+"','"+this.e_periode.getText()+"','"+DC+"',"+parseNilai(this.sg2.cells(4,i))+","+nilai+")");
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
					this.standarLib.clearByTag(this, new Array("0","1","8"),this.e_nb);						
					setTipeButton(tbSimpan);
					this.pc2.setActivePage(this.pc2.childPage[0]);			
					this.pc1.setActivePage(this.pc1.childPage[0]);					
					this.sg1.clear(1);
					this.sg2.clear(1);
					this.sg3.clear(1);										
					this.stsSimpan = 1;
					this.cb_nik.setSQL("select a.nik, a.nama from karyawan a inner join spm_if_m b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.flag_aktif='1'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Pemegang",true);
					this.doChange(this.cb_nik);
				break;
			case "simpan" :					
			case "ubah" :									
				this.preView = "1";				
				this.sg1.setTag("0");				
				this.sg1.validasi();		
				this.dataAkunGar = {rs:{rows:[]}};
				var data = this.dbLib.getDataProvider("select kode_akun from masakun where status_gar = '1' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataAkunGar = data;
				}				
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
				this.doHitungGar();
				if (this.flagGarFree == "0") {
					for (var i=0;i < this.sg2.getRowCount();i++){
						if (nilaiToFloat(this.sg2.cells(5,i))>0 && nilaiToFloat(this.sg2.cells(4,i)) < nilaiToFloat(this.sg2.cells(5,i))) {
							var k =i+1;
							system.alert(this,"Transaksi tidak valid.","Saldo Anggaran tidak mencukupi. [Baris : "+k+"]");
							return false;						
						}
					}
				}				
				if (nilaiToFloat(this.e_saldo.getText()) <= nilaiToFloat(this.e_total.getText())) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh melebihi Saldo.");
					return false;
				}
				if (nilaiToFloat(this.e_total.getText()) < 0) {
					system.alert(this,"Nilai transaksi tidak valid.","Nilai tidak boleh kurang dari nol.");
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
					sql.add("delete from spm_ifganti_m where no_ganti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from spm_ifganti_j where no_ganti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from angg_r where no_bukti='"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");					
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
		if (this.stsSimpan == 1) this.doClick();
	},
	doClick:function(sender){
		if (this.stsSimpan == 0) {
			this.sg1.clear(1); this.sg2.clear(1); 							
			this.cb_nik.setSQL("select a.nik, a.nama from karyawan a inner join spm_if_m b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.flag_aktif='1'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Pemegang",true);
		}
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"spm_ifganti_m","no_ganti",this.app._lokasi+"-IFG"+this.e_periode.getText().substr(2,2)+".","00000"));
		this.cb_nik.setFocus();
		setTipeButton(tbSimpan);
	},		
	doChange:function(sender){				
		if (sender == this.cb_nik && this.cb_nik.getText()!="" && this.stsSimpan == 1) {
			var strSQL = "select a.akun_if,a.kode_pp,a.nilai-isnull(e.reimburse,0)-isnull(f.ganti,0) as saldo,a.akun_if,a.nilai as nilai_if, "+
						 "r.bank,r.cabang,r.no_rek,r.nama_rek "+
			             "from spm_if_m a "+						 
						 "		inner join karyawan r on a.nik=r.nik and a.kode_lokasi=r.kode_lokasi "+
						 "		left join (select nik,kode_lokasi,sum(nilai) as reimburse "+
					     "                 from spm_ifreim_m where no_kas='-' and kode_lokasi='"+this.app._lokasi+"' and nik='"+this.cb_nik.getText()+"' "+
						 "                 group by nik,kode_lokasi) e on a.nik=e.nik and a.kode_lokasi=e.kode_lokasi "+
						 
						 "		left join (select nik,kode_lokasi,sum(nilai) as ganti "+
					     "                 from spm_ifganti_m where no_reim='-' and kode_lokasi='"+this.app._lokasi+"' and nik='"+this.cb_nik.getText()+"' "+
						 "                 group by nik,kode_lokasi) f on a.nik=f.nik and a.kode_lokasi=f.kode_lokasi "+
						 
						 "where a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   			
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){							
					this.e_saldo.setText(floatToNilai(line.saldo));					
					this.cb_pp.setText(line.kode_pp);					
					this.akunIF = line.akun_if;
					this.nilaiIF = parseFloat(line.nilai_if);
					this.kodePP = line.kode_pp;					
				}
			}
		}		
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){														
							if (this.preView == "1")  {
								this.nama_report="server_report_saku2_kopeg_kbitt_rptIfPtgForm";
								this.filter = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_aju='"+this.e_nb.getText()+"' ";
								this.filter2 = this.e_periode.getText()+"/";
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
							else  {
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
							this.dataPP = new portalui_arrayMap();														
							this.dataProyek = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];									
									this.dataAkun.set(line.kode_akun, line.nama);										
								}								
							}
							if (result.result[1]){	    			        
								var line;
								for (var i in result.result[1].rs.rows){
									line = result.result[1].rs.rows[i];									
									this.dataPP.set(line.kode_pp, line.nama);										
								}								
							}
							if (result.result[2]){	    			        
								var line;
								for (var i in result.result[2].rs.rows){
									line = result.result[2].rs.rows[i];									
									this.dataProyek.set(line.kode_proyek, line.nama);										
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
			this.standarLib.clearByTag(this, new Array("0","1","8"),this.e_nb);						
			setTipeButton(tbSimpan);
			this.pc2.setActivePage(this.pc2.childPage[0]);			
			this.pc1.setActivePage(this.pc1.childPage[0]);			
			this.sg1.clear(1);
			this.sg2.clear(1);
			this.sg3.clear(1);						
			this.stsSimpan = 1;
			this.cb_nik.setSQL("select a.nik, a.nama from karyawan a inner join spm_if_m b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.flag_aktif='1'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Pemegang",true);
			this.doChange(this.cb_nik);			
		} catch(e) {
			alert(e);
		}
	},	
	doCellEnter1: function(sender, col, row){
		switch(col){
			case 2 : 
					if (sender.cells(2,row) == ""){
						sender.setCell(2,row,"D");						
					}
				break;
			case 3 : 
					if (sender.cells(3,row) == ""){
						if (row == 0) sender.setCell(3,row,this.e_ket.getText());
						else sender.setCell(3,row,sender.cells(3,(row-1)) );
					}
				break;			
			case 5 : 
					if (sender.cells(5,row) == "") {
						if (row == 0) sender.setCell(5,row,this.app._kodePP);
						else {
							sender.setCell(5,row,sender.cells(5,(row-1)));
							sender.setCell(6,row,sender.cells(6,(row-1)));
						}
					}
				break;							
			case 7 : 
					if (sender.cells(7,row) == "") {
						if (row == 0) sender.setCell(7,row,this.dp_d1.getText());
						else {
							sender.setCell(7,row,sender.cells(7,(row-1)));							
						}
					}
				break;							
		}
	},
	doChangeCell1: function(sender, col, row){
		if ((col == 2 || col == 4) && (sender.cells(4,row) != "")) sender.validasi();
		sender.onChange.set(undefined,undefined);	    		
		if (col == 0) {
			if (sender.cells(0,row) != "") {				
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
			if (sender.cells(5,row) != "") {
				var pp = this.dataPP.get(sender.cells(5,row));
				if (pp) sender.cells(6,row,pp);
				else {
					if (trim(sender.cells(5,row)) != "") system.alert(this,"Kode PP "+sender.cells(5,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(5,row,"");
					sender.cells(6,row,"");
				}				
			}
		}
		if (col == 8) {
			if (sender.cells(8,row) != "") {
				var proyek = this.dataProyek.get(sender.cells(8,row));
				if (proyek) sender.cells(9,row,proyek);
				else {
					if (trim(sender.cells(8,row)) != "") system.alert(this,"Kode Proyek "+sender.cells(8,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(8,row,"");
					sender.cells(9,row,"");
				}				
			}
		}
		sender.onChange.set(this,"doChangeCell1");		
	},
	doNilaiChange1: function(){		
		try{
			var totD = totC = 0;
			for (var i = 0; i < this.sg1.getRowCount();i++){
				if (this.sg1.rowValid(i) && this.sg1.cells(4,i) != ""){
					if (this.sg1.cells(2,i).toUpperCase() == "D") totD += nilaiToFloat(this.sg1.cells(4,i));
					if (this.sg1.cells(2,i).toUpperCase() == "C") totC += nilaiToFloat(this.sg1.cells(4,i));
				}
			}			
			this.e_total.setText(floatToNilai(totD - totC));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}		
	},
	doEllipsClick1: function(sender, col, row){
		try{						
			if (col == 0){
				this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						"select distinct a.kode_akun, a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						//"       inner join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.periode like '"+this.e_periode.getText().substr(0,4)+"%' "+ 
						//"       inner join karyawan_pp d on c.kode_pp = d.kode_pp and c.kode_lokasi=d.kode_lokasi and d.nik='"+this.cb_nik.getText()+"' "+
						"where b.kode_flag in ('041') and a.kode_lokasi='"+this.app._lokasi+"'",
						
						"select count(distinct a.kode_akun) from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						//"       inner join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.periode like '"+this.e_periode.getText().substr(0,4)+"%' "+ 
						//"       inner join karyawan_pp d on c.kode_pp = d.kode_pp and c.kode_lokasi=d.kode_lokasi and d.nik='"+this.cb_nik.getText()+"' "+
						"where b.kode_flag in ('041') and a.kode_lokasi='"+this.app._lokasi+"'",
						["a.kode_akun","a.nama"],"and",["Kode","Nama"],false);				
			}
			if (col == 5){
				this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
						"select a.kode_pp, a.nama  from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.tipe='posting' and a.flag_aktif ='1'",
						"select count(a.kode_pp)  from pp a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi where b.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' and a.tipe='posting' and a.flag_aktif ='1'",						
						["a.kode_pp","a.nama"],"and",["Kode","Nama"],false);				
			}
			if (col == 8){
				this.standarLib.showListData(this, "Daftar Proyek",sender,undefined, 
						"select kode_proyek, nama  from spm_proyek where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"' union select '-','-'",
						"select count(*)  from spm_proyek where flag_aktif='1' and kode_lokasi = '"+this.app._lokasi+"'",						
						["kode_proyek","nama"],"and",["Kode","Nama"],false);				
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doHitungGar: function(){
		this.sg2.clear();
		var nilai = total = 0;
		for (var i=0;i < this.sg1.getRowCount();i++){
			if (this.sg1.rowValid(i) && this.sg1.cells(5,i) != "-"){
				if (this.sg1.cells(2,i) == "D") nilai = nilaiToFloat(this.sg1.cells(4,i));
				else nilai = nilaiToFloat(this.sg1.cells(4,i)) * -1;
				
				var isAda = false;
				var idx = total = 0;
				for (var j=0;j < this.sg2.getRowCount();j++){
					if (this.sg1.cells(0,i) == this.sg2.cells(0,j) && this.sg1.cells(5,i) == this.sg2.cells(2,j)) {
						isAda = true;
						idx = j;
						break;
					}
				}
				if (!isAda) {
					this.sg2.appendData([this.sg1.cells(0,i),this.sg1.cells(1,i),this.sg1.cells(5,i),this.sg1.cells(6,i),"0",floatToNilai(nilai),"0"]);
				} 
				else { 
					total = nilaiToFloat(this.sg2.cells(5,idx));
					total = total + nilai;
					this.sg2.setCell(5,idx,total);
				}
			}
		}
		var sls = 0;
		for (var i=0;i < this.sg2.getRowCount();i++){
			if (this.stsSimpan == 1) var data = this.dbLib.getDataProvider("select fn_cekagg2('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','-','"+this.e_periode.getText()+"') as gar ",true);
			else var data = this.dbLib.getDataProvider("select fn_cekagg3('"+this.sg2.cells(2,i)+"','"+this.app._lokasi+"','"+this.sg2.cells(0,i)+"','-','"+this.e_periode.getText()+"','"+this.e_nb.getText()+"') as gar ",true);			
			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];
				data = line.gar.split(";");
				sls = parseFloat(data[0]) - parseFloat(data[1]);
				this.sg2.cells(4,i,floatToNilai(sls));
				sls = sls - nilaiToFloat(this.sg2.cells(5,i));
				this.sg2.cells(6,i,floatToNilai(sls));
			}
		}
	},
	doLoad3:function(sender){																		
		var strSQL = "select a.no_ganti,convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.nilai "+
		             "from spm_ifganti_m a "+					 					 
					 "where a.periode='"+this.e_periode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted ='F' and a.no_reim='-'";		
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
			this.sg3.appendData([line.no_ganti,line.tgl,line.keterangan,floatToNilai(line.nilai)]); 
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
								
				var strSQL = "select a.* "+
				             "from spm_ifganti_m a "+
							 "where a.no_ganti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){								
						this.dp_d1.setText(line.tanggal);
						this.e_ket.setText(line.keterangan);												
						this.cb_nik.setSQL("select a.nik, a.nama from karyawan a inner join spm_if_m b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.nik='"+line.nik+"' and a.kode_lokasi='"+this.app._lokasi+"' and b.no_flag='-'",["a.nik","a.nama"],false,["Kode","Nama"],"and","Data Pemegang",true);
						this.cb_nik.setText(line.nik);						
						this.cb_pp.setText(line.kode_pp);																		
					}
				}								
				
				var strSQL = "select a.akun_if,a.kode_pp,a.nilai-isnull(e.reimburse,0)-isnull(f.ganti,0) as saldo,a.akun_if,a.nilai as nilai_if "+							 
							 "from spm_if_m a "+						 							 
							 
							 "		left join (select nik,kode_lokasi,sum(nilai) as reimburse "+
							 "                 from spm_ifreim_m where no_reim<>'"+this.e_nb.getText()+"' and no_kas='-' and kode_lokasi='"+this.app._lokasi+"' and nik='"+this.cb_nik.getText()+"' "+							 
							 "                 group by nik,kode_lokasi) e on a.nik=e.nik and a.kode_lokasi=e.kode_lokasi "+
							 
							 "		left join (select nik,kode_lokasi,sum(nilai) as ganti "+
							 "                 from spm_ifganti_m where no_ganti<>'"+this.e_nb.getText()+"' and no_reim='-' and kode_lokasi='"+this.app._lokasi+"' and nik='"+this.cb_nik.getText()+"' "+							 
							 "                 group by nik,kode_lokasi) f on a.nik=f.nik and a.kode_lokasi=f.kode_lokasi "+
							 
							 "where a.nik='"+this.cb_nik.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   			
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){							
						this.e_saldo.setText(floatToNilai(line.saldo));											
						this.akunIF = line.akun_if;
						this.nilaiIF = parseFloat(line.nilai_if);
						this.kodePP = line.kode_pp;						
					}
				}												
				var data = this.dbLib.getDataProvider("select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,a.kode_pp,c.nama as nama_pp,convert(varchar,a.tgl_bukti,103) as tgl_bukti,a.kode_proyek,isnull(d.nama,'-') as nama_proyek "+
							"from spm_ifganti_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
							"                    inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
							"                    left join spm_proyek d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi "+
							"where a.no_ganti = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.jenis = 'BEBAN' order by a.nu",true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg1.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];												
						this.sg1.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai),line.kode_pp,line.nama_pp,line.tgl_bukti,line.kode_proyek,line.nama_proyek]);
					}
				} else this.sg1.clear(1);											
			}									
		} catch(e) {alert(e);}
	}
});