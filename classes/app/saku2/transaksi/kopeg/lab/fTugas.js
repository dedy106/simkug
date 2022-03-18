window.app_saku2_transaksi_kopeg_lab_fTugas = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_lab_fTugas.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_lab_fTugas";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Tugas: Input", 0);	
		
		uses("portalui_uploader;saiCB;saiMemo;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");				
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,16,202,20],caption:"No Tugas",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,16,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_nama = new saiLabelEdit(this,{bound:[20,17,500,20],caption:"Deskripsi", maxLength:150});				
		
		this.pc1 = new pageControl(this,{bound:[20,29,900,380], childPage:["Data Tugas","Daftar Mahasiswa","Deskripsi Tugas","Rincian Tugas"]});		
		this.l_tgl2 = new portalui_label(this.pc1.childPage[0],{bound:[20,11,100,18],caption:"Tgl Mulai", underline:true});
		this.dp_d2 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,11,100,18]}); 
		this.l_tgl3 = new portalui_label(this.pc1.childPage[0],{bound:[300,11,100,18],caption:"Tgl Selesai", underline:true});
		this.dp_d3 = new portalui_datePicker(this.pc1.childPage[0],{bound:[400,11,100,18]}); 		
		this.l_tgl4 = new portalui_label(this.pc1.childPage[0],{bound:[20,12,100,18],caption:"Tgl Transaksi Dr", underline:true});
		this.dp_d4 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,12,100,18]}); 
		this.l_tgl5 = new portalui_label(this.pc1.childPage[0],{bound:[300,12,100,18],caption:"sd Tanggal", underline:true});
		this.dp_d5 = new portalui_datePicker(this.pc1.childPage[0],{bound:[400,12,100,18]}); 		
		this.e_tahun = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,22,140,20],caption:"Tahun - Semester", readOnly:true, tag:2});		
		this.c_sem = new saiCB(this.pc1.childPage[0],{bound:[170,22,50,20],caption:"",items:["1","2"], readOnly:true,tag:2, labelWidth:0});		
		this.cb_dosen = new saiCBBL(this.pc1.childPage[0],{bound:[20,23,202,20],caption:"Dosen",multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
		this.cb_matkul = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,202,20],caption:"Kajian",  multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,16,182,20],caption:"Kajian Ke", tag:2,readOnly:true});	
		this.e_matkul = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,17,480,20],caption:"Mata Kuliah", tag:2, readOnly:true});			
		this.cb_kelas = new saiCBBL(this.pc1.childPage[0],{bound:[20,12,202,20],caption:"Kelas", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[0,10,this.pc1.width-5,this.pc1.height-40],colCount:2,tag:0,
		            colTitle:["N I M","Nama"],
					colWidth:[[1,0],[300,80]],columnReadOnly:[true,[1],[0]],
					readOnly:true,					
					autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1});		
		
		this.e_memo = new saiMemo(this.pc1.childPage[2],{bound:[5,10,this.pc1.width-5,this.pc1.height-10],caption:"",labelWidth:0, tag:0});		
		this.sg = new saiGrid(this.pc1.childPage[3],{bound:[0,10,this.pc1.width-5,this.pc1.height-40],colCount:3,tag:0,
		            colTitle:["Tanggal","Deskripsi","Jenis"],
					colWidth:[[2,1,0],[80,600,100]],						
					buttonStyle:[[2],[bsAuto]], picklist:[[2],[new portalui_arrayMap({items:["UMUM","ADJUST","CLOSE","SALDO"]})]],checkItem:true,
					pasteEnable:true,autoAppend:true,defaultRow:1,pasteEnable:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:bsAll,grid:this.sg});						
		
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);									
			this.cb_dosen.setSQL("select kode_dosen, nama from lab_dosen where kode_dosen='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_dosen","nama"],false,["Kode","Nama"],"and","Daftar Dosen",true);
			this.cb_matkul.setSQL("select kode_matkul, nama from lab_matkul where kode_lokasi='"+this.app._lokasi+"'",["kode_matkul","nama"],false,["Kode","Nama"],"and","Daftar Mata Kuliah",true);			
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_lab_fTugas.extend(window.childForm);
window.app_saku2_transaksi_kopeg_lab_fTugas.implement({	
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
					sql.add("insert into lab_tugas(no_tugas,kode_lokasi,tanggal,nama,kode_matkul,kode_kelas,tgl_mulai,tgl_selesai,keterangan,flag_aktif,kode_dosen,tahun,semester,tgl_awal,tgl_akhir) values  "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_nama.getText()+"','"+this.cb_matkul.getText()+"','"+this.cb_kelas.getText()+"','"+this.dp_d2.getDateString()+"','"+this.dp_d3.getDateString()+"','"+this.e_memo.getText()+"','1','"+this.cb_dosen.getText()+"','"+this.e_tahun.getText()+"','"+this.c_sem.getText()+"','"+this.dp_d4.getDateString()+"','"+this.dp_d5.getDateString()+"')");
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into lab_tugas_d(no_tugas,kode_lokasi,nu,tanggal,keterangan,jenis) values "+
										"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(2,i)+"')");
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
					this.sg.clear(1); this.sg1.clear(1);
					setTipeButton(tbSimpan);
					this.doClick();
					this.pc1.setActivePage(this.pc1.childPage[0]);
				break;
			case "simpan" :																						
				if (this.sg.getRowValidCount() > 0){
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							if (this.sg.cells(2,i) != "UMUM" && this.sg.cells(2,i) != "ADJUST" && this.sg.cells(2,i) != "CLOSE" && this.sg.cells(2,i) != "SALDO") {
								system.alert(this,"Rincian tugas tidak valid.","Jenis transaksi tidak terdaftar ("+this.sg.cells(2,i)+").");
								return false;						
							}							
						}
					}
				}
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12){
			this.e_periode.setText(y+""+m);			
		}
		else {
			this.e_periode.setText(this.app._periode);					
		}			
		this.e_tahun.setText(y);
		this.doClick();				
	},			
	doClick:function(sender){
		if (this.e_periode.getText()!= "" ) {				
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"lab_tugas","no_tugas",this.app._lokasi+"-TGS"+this.e_periode.getText().substr(2,4)+".","000"));
			this.e_nama.setFocus();
		}
	},			
	doChange:function(sender){
		if (sender == this.cb_dosen || sender == this.cb_matkul) {
			if (this.cb_dosen.getText()!="" && this.cb_matkul.getText()!="") {
				this.cb_kelas.setSQL("select kode_kelas, nama from lab_kelas where kode_dosen='"+this.cb_dosen.getText()+"' and kode_matkul ='"+this.cb_matkul.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",["kode_kelas","nama"],false,["Kode","Nama"],"and","Daftar Kelas",true);
				var strSQL = "select a.keterangan,a.matkul+' - '+b.nama as matkul from lab_matkul a "+
							"inner join lab_matkul_m b on a.matkul=b.matkul and a.kode_lokasi=b.kode_lokasi "+
							"where a.kode_matkul ='"+this.cb_matkul.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){												
						this.e_ket.setText(line.keterangan);		
						this.e_matkul.setText(line.matkul);								
					}					
				}
			}
		}
		if (sender == this.cb_kelas && this.cb_kelas.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.nim,a.nama from lab_mhs a inner join lab_kelas_mhs b on a.nim=b.nim and a.kode_lokasi=b.kode_lokasi "+
			           "where b.kode_kelas='"+this.cb_kelas.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([line.nim,line.nama]);
				}
			} else this.sg1.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;					
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});


/*
format xls copy-paste
------------------------------------------
  tanggal    |        deskripsi  | jenis
------------------------------------------
  1/2        |     setoran       |  UMUM
  4/2        |     pembayaran    |  ADJUS 

------------------------------------------

*/