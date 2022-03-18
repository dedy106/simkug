window.app_saku2_transaksi_kopeg_ppbs_fEvalRekap = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_ppbs_fEvalRekap.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_ppbs_fEvalRekap";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Evaluasi Usulan Anggaran Rekap: Input", 0);	
		
		uses("portalui_uploader;saiCB;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		this.c_tahun = new saiCB(this,{bound:[20,22,202,20],caption:"Tahun",readOnly:true,tag:2});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});				
		this.cb_app = new saiCBBL(this,{bound:[20,19,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});
		this.cb_fs = new saiCBBL(this,{bound:[20,20,200,20],caption:"Format Laporan", multiSelection:false, maxLength:10, tag:2, change:[this,"doChange"]});
		
		this.p1 = new panel(this,{bound:[20,23,500,354],caption:"Daftar Akun Evaluasi"});							
		this.sg = new saiGrid(this.p1,{bound:[0,20,this.p1.width-5,this.p1.height-45],colCount:3,tag:0,
		            colTitle:["Kode Lap","Nama Lap","Persentase(+/-)"],
					colWidth:[[2,1,0],[100,150,80]],					
					columnReadOnly:[true,[1],[0,2]],
					buttonStyle:[[0],[bsEllips]], colFormat:[[2],[cfNilai]],
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],										
					autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:2,grid:this.sg});				
		
		this.rearrangeChild(10, 23);
					
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
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			this.cb_fs.setSQL("select kode_fs, nama from fsgar where kode_lokasi='"+this.app._lokasi+"'",["kode_fs","nama"],false,["Kode","Nama"],"and","Data Format Laporan",true);
			
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='GARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");						
			this.c_tahun.items.clear();
			var data = this.dbLib.getDataProvider("select year(getdate()) as tahun union select year(getdate())+1 as tahun order by tahun desc",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.c_tahun.addItem(i,line.tahun);
				}
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_ppbs_fEvalRekap.extend(window.childForm);
window.app_saku2_transaksi_kopeg_ppbs_fEvalRekap.implement({	
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
					sql.add("insert into agg_eval_m(no_eval,kode_lokasi,tahun,tanggal,keterangan,nik_app,tgl_input,nik_user,modul,kode_fs) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.c_tahun.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_app.getText()+"',getdate(),'"+this.app._userLog+"','REKAP','"+this.cb_fs.getText()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into agg_eval_d(no_eval,kode_lokasi,kode_akun,persen,bulan) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"',"+nilaiToFloat(this.sg.cells(2,i))+",'-')");
								sql.add("update a set a.vol=a.vol+((a.vol * "+nilaiToFloat(this.sg.cells(2,i))+")/100), a.total=round(a.total+((a.total * "+nilaiToFloat(this.sg.cells(2,i))+")/100),0)  "+
										"from agg_d a inner join relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
										"where a.kode_lokasi='"+this.app._lokasi+"' and a.periode like '"+this.c_tahun.getText()+"%' and b.kode_neraca='"+this.sg.cells(0,i)+"'");
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
					setTipeButton(tbSimpan);
				break;
			case "simpan" :									
				this.sg.validasi();								
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);								
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){		
		
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_eval_m","no_eval",this.app._lokasi+"-EVAL"+this.c_tahun.getText()+".","000"));
			this.e_ket.setFocus();
			setTipeButton(tbSimpan);
		}				
	},
	doChange:function(sender){
		if (sender == this.cb_fs && this.cb_fs.getText()!="") {
			var sql = new server_util_arrayList();			
			sql.add("select kode_neraca,nama from neracagar where kode_fs = '"+this.cb_fs.getText()+"' and tipe = 'Posting' and kode_lokasi = '"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
		}	
	},
	doChangeCell: function(sender, col, row){		
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (this.sg.cells(0,row) != "") {
				var kodelap = this.dataKodeLap.get(sender.cells(0,row));
				if (kodelap) sender.cells(1,row,kodelap);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Rekap "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}				
		sender.onChange.set(this,"doChangeCell");		
	},		
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0 && this.cb_fs.getText()!=""){
					this.standarLib.showListData(this, "Daftar Kode Laporan",sender,undefined, 
						    "select kode_neraca,nama   from neracagar where kode_fs = '"+this.cb_fs.getText()+"' and tipe = 'Posting' and kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_neraca) from neracagar where kode_fs = '"+this.cb_fs.getText()+"' and tipe = 'Posting' and kode_lokasi = '"+this.app._lokasi+"'",
							["kode_neraca","nama"],"and",["Kode","Nama"],false);				
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (No : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;	      		
					case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataKodeLap = new portalui_arrayMap();														
							if (result.result[0]){	    			        
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataKodeLap.set(line.kode_neraca, line.nama);
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
	}	
});