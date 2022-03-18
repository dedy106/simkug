window.app_hris_transaksi_karyawan_fPenilaian = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_karyawan_fPenilaian.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_karyawan_fPenilaian";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Penilaian Karyawan", 0);	
		this.maximize();
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl");
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Penilaian",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.l_tglawal = new portalui_label(this,{bound:[20,13,100,18],caption:"Periode Awal", underline:true});
		this.dp_dawal = new portalui_datePicker(this,{bound:[120,13,100,18],date:new Date().getDateStr()}); 
		this.l_tglakhir = new portalui_label(this,{bound:[230,13,100,18],caption:"Periode Akhir", underline:true});
		this.dp_dakhir = new portalui_datePicker(this,{bound:[330,13,100,18],date:new Date().getDateStr()}); 
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:100});		
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Karyawan", multiSelection:false, maxLength:10, tag:1, change:[this,"doLoad"]});
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Atasan", multiSelection:false, maxLength:10, tag:1});
		
		try {
			this.cb_buat.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from gr_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
			
			this.pc1 = new pageControl(this,{bound:[20,19,this.width - 95, this.height - 200], childPage:["Tugas Pokok","Keterampilan Teknis","Sikap Terhadap Perusahaan","Kemampuan Manajerial","Fungsi Jabatan"]}); 									    
			this.sg = new saiGrid(this.pc1.childPage[0],{bound:[10,20,910,260],colCount:5,tag:2,
		            colTitle:["Kode Tugas","Nama Tugas","Bobot","Skala","Justifikasi"],
					colWidth:[[4,3,2,1,0],[ 200,60,60,450,80]],
					columnReadOnly:[true,[2],[2]],
					buttonStyle:[[3,0],[bsAuto,bsEllips]], 
					colFormat:[[2],[cfNilai,cfNilai]],
					picklist:[[3],[new portalui_arrayMap({items:["B","PP","MS","DS","LB"]})]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],autoAppend:false});
			this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[10,290,915,25],buttonStyle:3,grid:this.sg});
			
			this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[10,20,910,260],colCount:4,tag:2,
		            colTitle:["Kode Kriteria","Nama Kriteria","Skala","Justifikasi"],
					colWidth:[[3,2,1,0],[200,60,450,80]],
					columnReadOnly:[true,[2],[2]],
					buttonStyle:[[2,0],[bsAuto,bsEllips]], 
					picklist:[[2],[new portalui_arrayMap({items:["B","PP","MS","DS","LB"]})]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],autoAppend:false});
			this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[10,290,915,25],buttonStyle:3,grid:this.sg2});
			
			this.sg3 = new saiGrid(this.pc1.childPage[2],{bound:[10,20,910,260],colCount:4,tag:2,
		            colTitle:["Kode Kriteria","Nama Kriteria","Skala","Justifikasi"],
					colWidth:[[3,2,1,0],[200,60,450,80]],
					columnReadOnly:[true,[2],[2]],
					buttonStyle:[[2,0],[bsAuto,bsEllips]], 
					picklist:[[2],[new portalui_arrayMap({items:["B","PP","MS","DS","LB"]})]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],autoAppend:false});
			this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[10,290,915,25],buttonStyle:3,grid:this.sg3});
			
			this.sg4 = new saiGrid(this.pc1.childPage[3],{bound:[10,20,910,260],colCount:4,tag:2,
		            colTitle:["Kode Kriteria","Nama Kriteria","Skala","Justifikasi"],
					colWidth:[[3,2,1,0],[200,60,450,80]],
					columnReadOnly:[true,[2],[2]],
					buttonStyle:[[2,0],[bsAuto,bsEllips]], 
					picklist:[[2],[new portalui_arrayMap({items:["B","PP","MS","DS","LB"]})]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],autoAppend:false});
			this.sgn4 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[10,290,915,25],buttonStyle:3,grid:this.sg4});
			
			this.sg5 = new saiGrid(this.pc1.childPage[4],{bound:[10,20,910,260],colCount:1,tag:3,
		            colTitle:["Fungsi Jabatan"],
					colWidth:[[0],
					[600]],
					defaultRow:1,
					autoAppend:true});
			this.sgn5 = new portalui_sgNavigator(this.pc1.childPage[4],{bound:[10,350,915,25],buttonStyle:2,grid:this.sg5});
			
			this.rearrangeChild(10, 23);
			this.pc1.childPage[0].rearrangeChild(10, 22);
			this.pc1.childPage[1].rearrangeChild(10, 22);
			this.pc1.childPage[2].rearrangeChild(10, 22);
			this.pc1.childPage[3].rearrangeChild(10, 22);
			this.pc1.childPage[4].rearrangeChild(10, 22);
			this.maximize();		
			this.setTabChildIndex();
			setTipeButton(tbSimpan);	
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_karyawan_fPenilaian.extend(window.childForm);
window.app_hris_transaksi_karyawan_fPenilaian.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					var data = this.dbLib.getDataProvider("select kode_kategori, skala, bobot from gr_kategori",true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						this.dataARR = data;
					}
					var nilai; var nilai_skala; var nilai_bobot;
					sql.add("insert into gr_penilaian_m(no_penilaian, kode_lokasi, tanggal, keterangan, nik_buat, nik_app, periode_awal, periode_akhir, nik_user, tgl_input, periode ) values "+
						    "	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.dp_dawal.getDateString()+"','"+this.dp_dakhir.getDateString()+"','"+this.app._userLog+"',getdate(),'"+this.e_periode.getText()+"')");
										
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							var nilai_skala=0;
							if (this.sg.rowValid(i)){
								for (var j=0;j < this.dataARR.rs.rows.length;j++){
									if (this.sg.cells(3,i) == this.dataARR.rs.rows[j].kode_kategori) {
										nilai_skala = parseFloat(this.dataARR.rs.rows[j].skala);
									}
								}
								nilai=parseNilai(this.sg.cells(2,i))*nilai_skala;
								sql.add("insert into gr_penilaian_d(no_penilaian, kode_tugas, nik, kode_lokasi, rangking, bobot, kode_skala, nilai_skala, nilai, justifikasi, nik_user, tgl_input,periode ) values "+  
										"('"+this.e_nb.getText()+"','"+this.sg.cells(0,i)+"','"+this.cb_buat.getText()+"','"+this.app._lokasi+"',"+i+","+parseNilai(this.sg.cells(2,i))+",'"+this.sg.cells(3,i)+"',"+nilai_skala+","+nilai+",'"+this.sg.cells(4,i)+"','"+this.app._userLog+"',getdate(),'"+this.e_periode.getText()+"')");
							}
						}						
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							var nilai_skala=0;
							if (this.sg2.rowValid(i)){
								for (var j=0;j < this.dataARR.rs.rows.length;j++){
									if (this.sg2.cells(2,i) == this.dataARR.rs.rows[j].kode_kategori) {
										nilai_skala = parseFloat(this.dataARR.rs.rows[j].skala);
										nilai_bobot = parseFloat(this.dataARR.rs.rows[j].bobot);
									}
								}
								nilai=nilai_bobot*nilai_skala;
								sql.add("insert into gr_penilaian_dkriteria(no_penilaian, kode_kriteria, nik, kode_lokasi,kode_skala, nilai_skala, keterangan, nik_user, tgl_input,periode,nilai ) values "+  
										"('"+this.e_nb.getText()+"','"+this.sg2.cells(0,i)+"','"+this.cb_buat.getText()+"','"+this.app._lokasi+"','"+this.sg2.cells(2,i)+"',"+nilai_skala+",'"+this.sg2.cells(3,i)+"','"+this.app._userLog+"',getdate(),'"+this.e_periode.getText()+"',"+nilai+")");
							}
						}						
					}
					if (this.sg3.getRowValidCount() > 0){
						for (var i=0;i < this.sg3.getRowCount();i++){
							var nilai_skala=0;
							if (this.sg3.rowValid(i)){
								for (var j=0;j < this.dataARR.rs.rows.length;j++){
									if (this.sg3.cells(2,i) == this.dataARR.rs.rows[j].kode_kategori) {
										nilai_skala = parseFloat(this.dataARR.rs.rows[j].skala);
										nilai_bobot = parseFloat(this.dataARR.rs.rows[j].bobot);
									}
								}
								nilai=nilai_bobot*nilai_skala;
								sql.add("insert into gr_penilaian_dkriteria(no_penilaian, kode_kriteria, nik, kode_lokasi,kode_skala, nilai_skala, keterangan, nik_user, tgl_input,periode,nilai) values "+  
										"('"+this.e_nb.getText()+"','"+this.sg3.cells(0,i)+"','"+this.cb_buat.getText()+"','"+this.app._lokasi+"','"+this.sg3.cells(2,i)+"',"+nilai_skala+",'"+this.sg3.cells(3,i)+"','"+this.app._userLog+"',getdate(),'"+this.e_periode.getText()+"',"+nilai+")");
							}
						}						
					}
					if (this.sg4.getRowValidCount() > 0){
						for (var i=0;i < this.sg4.getRowCount();i++){
							var nilai_skala=0;
							if (this.sg4.rowValid(i)){
								for (var j=0;j < this.dataARR.rs.rows.length;j++){
									if (this.sg4.cells(2,i) == this.dataARR.rs.rows[j].kode_kategori) {
										nilai_skala = parseFloat(this.dataARR.rs.rows[j].skala);
										nilai_bobot = parseFloat(this.dataARR.rs.rows[j].bobot);
									}
								}
								nilai=nilai_bobot*nilai_skala;
								sql.add("insert into gr_penilaian_dkriteria(no_penilaian, kode_kriteria, nik, kode_lokasi,kode_skala, nilai_skala, keterangan, nik_user, tgl_input, periode,nilai) values "+  
										"('"+this.e_nb.getText()+"','"+this.sg4.cells(0,i)+"','"+this.cb_buat.getText()+"','"+this.app._lokasi+"','"+this.sg4.cells(2,i)+"',"+nilai_skala+",'"+this.sg4.cells(3,i)+"','"+this.app._userLog+"',getdate(),'"+this.e_periode.getText()+"',"+nilai+")");
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
					this.standarLib.clearByTag(this, new Array("0","1"),undefined);
					this.sg.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
				setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
					var tot = 0;
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							tot += nilaiToFloat(this.sg.cells(2,i));
						}
					}
					if (tot != 100) {
						system.alert(this,"Transaksi tidak valid.","Total bobot Tugas Pokok tidak sama dengan 100");
						return false;						
					}
					else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
		return false;
	},	
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_penilaian_m","no_penilaian",this.app._lokasi+"-PNK"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doLoad:function(sender){
		if (this.cb_buat.getText()!="") {
			//fungsi jabatan
			var data = this.dbLib.getDataProvider("select a.kode_tugas,a.nama,0 as bobot,'MS' as skala,'-' as ket from gr_karyawan_tugas a "+
												  "where a.nik = '"+this.cb_buat.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_tugas,line.nama,line.bobot,line.skala.toUpperCase(),line.ket]);
				}
			} else this.sg.clear(1);
			
			//fungsi jabatan
			var data = this.dbLib.getDataProvider("select a.kode_kriteria,a.nama,'MS' as skala,'-' as ket from gr_penilaian_kriteria a "+
												  "where a.kode_klp = '1' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_kriteria,line.nama,line.skala.toUpperCase(),line.ket]);
				}
			} else this.sg2.clear(1);
			
			var data = this.dbLib.getDataProvider("select a.kode_kriteria,a.nama,'MS' as skala,'-' as ket from gr_penilaian_kriteria a "+
												  "where a.kode_klp = '2' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg3.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg3.appendData([line.kode_kriteria,line.nama,line.skala.toUpperCase(),line.ket]);
				}
			} else this.sg3.clear(1);
			
			var data = this.dbLib.getDataProvider("select a.kode_kriteria,a.nama,'MS' as skala,'-' as ket from gr_penilaian_kriteria a "+
												  "where a.kode_klp = '3' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg4.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg4.appendData([line.kode_kriteria,line.nama,line.skala.toUpperCase(),line.ket]);
				}
			} else this.sg4.clear(1);

			//fungsi jabatan
			var data = this.dbLib.getDataProvider("select a.nama from gr_karyawan_fungsi a "+
												  "where a.nik = '"+this.cb_buat.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg5.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg5.appendData([line.nama]);
				}
			} else this.sg5.clear(1);
			
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});