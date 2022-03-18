window.app_hris_transaksi_kesehatan_fFinalKlaim = function(owner)
{
	if (owner)
	{
		window.app_hris_transaksi_kesehatan_fFinalKlaim.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_transaksi_kesehatan_fFinalKlaim";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Finalisasi Klaim Asuransi: Input", 0);	
		
		uses("saiCB;saiCBBL;saiEdit;datePicker;pageControl;saiGrid;sgNavigator");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Approval",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});		
		this.cb_app = new saiCBBL(this,{bound:[20,18,200,20],caption:"NIK Approval", multiSelection:false, maxLength:10, tag:2,readOnly:true});
		this.cb_asur = new saiCBBL(this,{bound:[20,17,200,20],caption:"Asuransi", multiSelection:false, maxLength:10, tag:2});
		this.bTampil = new button(this,{bound:[838,17,80,18],caption:"Tampil Data",click:[this,"doTampilClick"]});			
		
		this.pc1 = new pageControl(this,{bound:[20,20,900,320], childPage:["Data Pengajuan","Detail Data Klaim"]});		
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[0,5,this.pc1.width-5,this.pc1.height-35],colCount:11,tag:9,
				colTitle:["Status","Catatan","Tgl Bayar","No Klaim","Tgl Input","Keterangan","Loker","Karyawan","Tgl Kuitansi","Nilai Pengajuan","Nilai Disetujui"],
				colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[120,100,100,200,200,220,70,120,100,150,80]],
				columnReadOnly:[true,[0,2,3,4,5,6,7,8,9],[1,10]],
				colFormat:[[9,10],[cfNilai,cfNilai]],
				picklist:[[0],[new portalui_arrayMap({items:["APP","INPROG"]})]],
				buttonStyle:[[0,2],[bsAuto,bsDate]],defaultRow:1,dblClick:[this,"doDoubleClick"],autoAppend:false});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg});

		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:6,tag:9,
		            colTitle:["NIK","No Urut","Nama Pasien","Status","Jenis Perawatan","Nilai"],
					colWidth:[[5,4,3,2,1,0],[90,100,150,210,40,70]],
					colFormat:[[5],[cfNilai]],
					readOnly:true,
					defaultRow:1,autoAppend:false});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});
		
		this.rearrangeChild(10, 23);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.cb_app.setSQL("select a.nik, a.nama from gr_karyawan a "+
							"inner join gr_otorisasi b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi "+
							"where a.kode_lokasi='"+this.app._lokasi+"' and b.sts_oto='APPKLAIM' ",["a.nik","a.nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);			
			this.cb_asur.setSQL("select kode_asur, nama from gr_asur where kode_lokasi='"+this.app._lokasi+"'",["kode_asur","nama"],false,["Kode","Nama"],"and","Data Asuransi",true);			
			this.cb_app.setText(this.app._userLog);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_hris_transaksi_kesehatan_fFinalKlaim.extend(window.childForm);
window.app_hris_transaksi_kesehatan_fFinalKlaim.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_ver_m","no_ver",this.app._lokasi+"-FKL"+this.e_periode.getText().substr(2,4)+".","000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("insert into gr_ver_m(no_ver,kode_lokasi,periode,tanggal,modul,nik_buat,nik_app,keterangan,tgl_input,nik_user,no_del) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','FINALKLAIM','-','"+this.cb_app.getText()+"','"+this.e_ket.getText()+"',getdate(),'"+this.app._userLog+"','-')");
	
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (this.sg.cells(0,i).toUpperCase() != "INPROG") {
									if (this.sg.cells(0,i).toUpperCase() == "APP") var vProgress = "2"; else var vProgress = "Y";
									sql.add("insert into gr_ver_d(no_ver,kode_lokasi,modul,no_bukti,status,catatan,no_del) values "+
											"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','FINALKLAIM','"+this.sg.cells(3,i)+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(1,i)+"','-')");									
									sql.add("update gr_klaim_m set tgl_final='"+this.sg.getCellDateValue(2,i)+"', nilai_final="+parseNilai(this.sg.cells(10,i))+", progress='"+vProgress+"' where no_klaim='"+this.sg.cells(3,i)+"' and kode_lokasi='"+this.app._lokasi+"'");
								}
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
					this.sg2.clear(1);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.simpan();
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
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.e_periode.setText(y+""+m);
		this.e_nb.setText("");
	},
	doTampilClick:function(sender){		
		if (this.e_periode.getText() != "") {
			var data = this.dbLib.getDataProvider("select a.no_klaim,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,b.kode_loker+' - '+b.nama as loker,a.nik_buat+' - '+c.nama as karyawan,convert(varchar,a.tgl_kuitansi,103) as tgl_kuitansi,isnull(x.nilai,0) as nilai  "+
				"from gr_klaim_m a "+
				"                inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi "+
				"				 inner join gr_loker b on c.kode_loker=b.kode_loker and c.kode_lokasi=b.kode_lokasi "+
				"                inner join (select no_klaim,kode_lokasi,sum(nilai) as nilai from gr_klaim_d group by no_klaim,kode_lokasi) x on x.no_klaim=a.no_klaim and a.kode_lokasi=x.kode_lokasi "+
				"where a.kode_asur ='"+this.cb_asur.getText()+"' and a.progress = '1' and a.kode_lokasi='"+this.app._lokasi+"' and a.periode<='"+this.e_periode.getText()+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData(["INPROG","-",this.dp_d1.getText(),line.no_klaim,line.tanggal,line.keterangan,line.loker,line.karyawan,line.tgl_kuitansi,floatToNilai(line.nilai),0]);
				}
			} else this.sg.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[0]);
		}
		else {
			system.alert(this,"Data tidak valid.","Periode harus diisi.");
		}
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"gr_ver_m","no_ver",this.app._lokasi+"-FKL"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_ket.setFocus();
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(2,row) != "") {
			var data = this.dbLib.getDataProvider(
				"select a.nik,a.no_urut,b.nama,c.nama as sts_kel,a.keterangan,a.nilai "+
				"from gr_klaim_d a "+
				"inner join gr_keluarga b on a.nik=b.nik and a.no_urut=b.no_urut and a.kode_lokasi=b.kode_lokasi "+
				"inner join gr_status_kel c on c.sts_kel=b.sts_kel and c.kode_lokasi=b.kode_lokasi where a.no_klaim='"+this.sg.cells(3,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];																
					this.sg2.appendData([line.nik,line.no_urut,line.nama,line.sts_kel,line.keterangan,floatToNilai(line.nilai)]);
				}
			} else this.sg2.clear(1);
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
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
