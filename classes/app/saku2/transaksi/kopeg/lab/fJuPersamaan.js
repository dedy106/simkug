window.app_saku2_transaksi_kopeg_lab_fJuPersamaan = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_lab_fJuPersamaan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_lab_fJuPersamaan";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Jurnal Umum : Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;wysiwyg;portalui_saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,visible:false,readOnly:true});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"No Bukti",visible:false});		
		
		this.cb_tugas = new saiCBBL(this,{bound:[20,10,220,20],caption:"No Tugas", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.e_dosen = new portalui_saiLabelEdit(this,{bound:[20,14,400,20],caption:"Dosen",tag:2,readOnly:true});
		this.e_kajian = new portalui_saiLabelEdit(this,{bound:[520,14,400,20],caption:"Kajian - Ke",tag:2,readOnly:true});
		this.e_kelas = new portalui_saiLabelEdit(this,{bound:[20,15,400,20],caption:"Kelas",tag:2,readOnly:true});
		this.e_matkul = new portalui_saiLabelEdit(this,{bound:[520,15,400,20],caption:"Mata Kuliah",tag:2,readOnly:true});
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,400], childPage:["Deskripsi Tugas","Rincian Tugas","Item Jurnal","Rekapitulasi"]});				
		this.e_range = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[5,11,400,20],caption:"Range Tanggal",tag:2,readOnly:true});		
		this.e_memo = new saiMemo(this.pc1.childPage[0],{bound:[5,10,this.pc1.width-10,this.pc1.height-50],caption:"",labelWidth:0, tag:2});				
		
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,10,this.pc1.width-5,this.pc1.height-40],colCount:4,tag:2,
		            colTitle:["Tanggal","Deskripsi","Jenis","ID Soal"],
					colWidth:[[3,2,1,0],[80,80,460,100]],						
					readOnly:true, autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg1});
		
		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:5,tag:0,
		            colTitle:["Tanggal","Kode Akun","Nama Akun","D/C","Nilai"],
					colWidth:[[4,3,2,1,0],[100,70,250,80,80]],					
					columnReadOnly:[true,[2],[0,1,3,4]],
					buttonStyle:[[0,1,3],[bsDate,bsEllips,bsAuto]], 
					colFormat:[[4],[cfNilai]],picklist:[[3],[new portalui_arrayMap({items:["D","C"]})]],checkItem: true,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					autoAppend:true,defaultRow:1,pasteEnable:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		this.cb1 = new portalui_checkBox(this.sgn,{bound:[760,5,100,25],caption:"Preview",selected:true});

		this.sg2 = new saiGrid(this.pc1.childPage[3],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:3,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Total"],
					colWidth:[[2,1,0],[80,250,80]],					
					readOnly:true,colFormat:[[2],[cfNilai]],autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});		
		
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],visible:false}); 
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
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
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_tugas.setSQL("select a.no_tugas, a.nama from lab_tugas a "+
			                     "       inner join lab_kelas_mhs c on a.kode_kelas=c.kode_kelas and a.kode_lokasi=c.kode_lokasi and c.nim ='"+this.app._userLog+"' "+
								 "       left join lab_close b on a.no_tugas=b.no_tugas and a.kode_lokasi=b.kode_lokasi and b.nik_user='"+this.app._userLog+"' "+
								 "where b.no_tugas is null and a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["no_tugas","nama"],false,["Kode","Nama"],"and","Daftar Tugas",true);
			this.e_memo.setReadOnly(true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_lab_fJuPersamaan.extend(window.childForm);
window.app_saku2_transaksi_kopeg_lab_fJuPersamaan.implement({	
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
			this.doClick();
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into lab_ju_m(no_ju,kode_lokasi,periode,tanggal,no_dokumen,keterangan,kode_pp,modul,jenis,kode_curr,kurs,nilai,nik_buat,nik_setuju,posted,no_tugas,tgl_input,nik_user,catatan,id_soal) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','-','PERSAMAAN AKUNTANSI','-','JU','SAMA','IDR',1,0,'-','-','F','"+this.cb_tugas.getText()+"',getdate(),'"+this.app._userLog+"','-',0)");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into lab_ju_j(no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,no_tugas,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input) values "+
										"	('"+this.e_nb.getText()+"','-','"+this.sg.getCellDateValue(0,i)+"',"+i+",'"+this.sg.cells(1,i)+"','-','"+this.sg.cells(3,i).toUpperCase()+"',"+parseNilai(this.sg.cells(4,i))+",'-','-','"+this.cb_tugas.getText()+"','"+this.app._lokasi+"','JU','SAMA','"+this.e_periode.getText()+"','IDR',1,'"+this.app._userLog+"',getdate())");
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
					this.sg.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
					
					var data = this.dbLib.getDataProvider("select a.nu,a.tanggal,a.keterangan,a.jenis "+					
							   "from lab_tugas_d a "+
							   "where a.no_tugas='"+this.cb_tugas.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						var line;
						this.sg1.clear();
						for (var i in data.rs.rows){
							line = data.rs.rows[i];							
							this.sg1.appendData([line.tanggal,line.keterangan,line.jenis,line.nu]);
						}
					} else this.sg1.clear(1);						
					
				break;
			case "simpan" :									
				for (var i=0;i < this.sg.getRowCount();i++){					
					if (!this.sg.rowValid(i)){
						var isKosong = true;
						for (var j=0;j < this.sg.getColCount();j++){
							if (this.sg.cells(j,i) != "") {
								isKosong = false;
								break;
							}							
						}						
						if (!isKosong) {
							system.alert(this,"Transaksi tidak valid.","Terdapat kolom yang kosong.");
							return false;
						}
					}
					else {
						var k = i+1;
						var data = this.dbLib.getDataProvider("select no_tugas from lab_tugas where '"+this.sg.getCellDateValue(0,i)+"' between tgl_awal and tgl_akhir and no_tugas='"+this.cb_tugas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object"){
							var line = data.rs.rows[0];							
							if (line == undefined){
								system.alert(this,"Transaksi tidak valid (Baris : "+k+").","Tanggal transaksi tidak dalam range tugas (Tanggal "+this.e_range.getText()+").");
								return false;						
							} 
						}							
					}					
				}
				this.sg.validasi();								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);													
				
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
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
		this.doClick();
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"lab_ju_m","no_ju",this.app._lokasi+"-JU.","000000"));		
	},	
	doChange:function(sender){
		if (sender == this.cb_tugas && this.cb_tugas.getText()!="") {
			var sql = new server_util_arrayList();
			sql.add("select kode_akun,nama from lab_masakun where nik_user='"+this.app._userLog+"' and no_tugas='"+this.cb_tugas.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);			
			
			var data = this.dbLib.getDataProvider("select a.keterangan,b.nama as dosen,c.nama+' - '+c.keterangan as kajian,d.nama as kelas,c.matkul, convert(varchar,a.tgl_awal,103)+' - '+convert(varchar,a.tgl_akhir,103) as tgl_range "+
					   "from lab_tugas a inner join lab_dosen b on a.kode_dosen=b.kode_dosen and a.kode_lokasi=b.kode_lokasi "+
					   "                 inner join lab_matkul c on a.kode_matkul=c.kode_matkul and a.kode_lokasi=c.kode_lokasi "+
					   "                 inner join lab_kelas d on a.kode_kelas=d.kode_kelas and a.kode_lokasi=d.kode_lokasi "+
					   "where a.no_tugas='"+this.cb_tugas.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.e_dosen.setText(line.dosen);
					this.e_matkul.setText(line.matkul);
					this.e_kajian.setText(line.kajian);
					this.e_kelas.setText(line.kelas);	
					this.e_range.setText(line.tgl_range);					
					this.e_memo.setText(line.keterangan);
				} 
			}
			var data = this.dbLib.getDataProvider("select a.nu,a.tanggal,a.keterangan,a.jenis "+					
			           "from lab_tugas_d a "+
					   "where a.no_tugas='"+this.cb_tugas.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.tanggal,line.keterangan,line.jenis,line.nu]);
				}
			} else this.sg1.clear(1);						
		}
	},	
	doChangeCell: function(sender, col, row){
		if ((col == 3 || col == 4) && (this.sg.cells(4,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 1) {
			if (this.sg.cells(1,row) != "") {
				var akun = this.dataAkun.get(sender.cells(1,row));
				if (akun) sender.cells(2,row,akun);
				else {                                    
					if (trim(sender.cells(1,row)) != "") system.alert(this,"Kode Akun "+sender.cells(1,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(1,row,"");
					sender.cells(2,row,"");
				}				
			}
		}				
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{			
			this.sg2.clear();
			var nilai = total = 0;
			for (var i=0;i < this.sg.getRowCount();i++){
				if (this.sg.rowValid(i) && this.sg.cells(4,i) != "" ){					
					if (this.sg.cells(3,i) == "D") nilai = nilaiToFloat(this.sg.cells(4,i));
					else nilai = nilaiToFloat(this.sg.cells(4,i)) * -1;
					
					var isAda = false;
					var idx = total = 0;
					for (var j=0;j < this.sg2.getRowCount();j++){
						if (this.sg.cells(1,i) == this.sg2.cells(0,j)) {
							isAda = true;
							idx = j;
							break;
						}
					}
					if (!isAda) {						
						this.sg2.appendData([this.sg.cells(1,i),this.sg.cells(2,i),floatToNilai(nilai)]);
					} 
					else { 
						total = nilaiToFloat(this.sg2.cells(2,idx));
						total = total + nilai;
						this.sg2.setCell(2,idx,total);
					}
				}
			}					
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},			
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 1){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
						    "select kode_akun,nama from lab_masakun where nik_user='"+this.app._userLog+"' and no_tugas='"+this.cb_tugas.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_akun) from lab_masakun where nik_user='"+this.app._userLog+"' and no_tugas='"+this.cb_tugas.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
							["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}				
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},		
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							if (this.cb1.isSelected()) {								
								this.nama_report="server_report_saku2_kopeg_lab_rptBuktiJurnal";
								this.filter2 = " where a.kode_lokasi='"+this.app._lokasi+"' and a.no_ju='"+this.e_nb.getText()+"' ";
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
							else {
								system.info(this,"Transaksi telah sukses tereksekusi (No Bukti : "+ this.e_nb.getText()+")","");							
								this.clearLayar();
							} 
						}else system.info(this,result,"");
	    			break;
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataAkun = new portalui_arrayMap();							
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
			this.sg.clear(1); 
			this.pc1.setActivePage(this.pc1.childPage[0]);
			setTipeButton(tbSimpan);
			
			var data = this.dbLib.getDataProvider("select a.nu,a.tanggal,a.keterangan,a.jenis  "+					
			           "from lab_tugas_d a "+
					   "where a.no_tugas='"+this.cb_tugas.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.tanggal,line.keterangan,line.jenis,line.nu]);
				}
			} else this.sg1.clear(1);						
			
		} catch(e) {
			alert(e);
		}
	}
});