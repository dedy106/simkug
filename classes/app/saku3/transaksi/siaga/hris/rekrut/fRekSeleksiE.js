window.app_saku3_transaksi_siaga_hris_rekrut_fRekSeleksiE = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siaga_hris_rekrut_fRekSeleksiE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siaga_hris_rekrut_fRekSeleksiE";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Seleksi : Edit", 0);	
		
		uses("saiCBBL;saiEdit;saiGrid;sgNavigator;datePicker");
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()});		
		this.e_nb = new saiCBBL(this,{bound:[20,12,220,20],caption:"No Seleksi", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:200});		
		this.cb_lowong = new saiCBBL(this,{bound:[20,24,220,20],caption:"Lowongan Kerja", multiSelection:false, maxLength:3, tag:1,change:[this,"doChange"]});
		this.cb_proses = new saiCBBL(this,{bound:[20,15,220,20],caption:"Proses", multiSelection:false, maxLength:10, tag:1,change:[this,"doChange"]});
		
		this.p1 = new panel(this,{bound:[10,23,900,350],caption:"Daftar Pelamar Pekerjaan"});		
		this.sg = new saiGrid(this.p1,{bound:[1,20,895,300],colCount:13,tag:1,
		            colTitle:["Kode","Nama Lowongan","Hasil","Hadir","Status","NIP","Nama","Alamat","Gender","Pendidikan","Jurusan","Perguruan Tinggi","IPK"],
					colWidth:[[12,11,10,9,8,7,6,5,4,3,2,1,0],[60,100,100,100,60,200,150,80,70,70,150,100,70]],
					columnReadOnly:[true,[0,1,3,4,5,6,7,8,9,10,11,12],[2]],
					colHide:[[0,1],[true,true]],
					buttonStyle:[[0,3,4,5],[bsEllips,bsAuto,bsAuto,bsEllips]], 
					picklist:[[3,4],[new portalui_arrayMap({items:["OK","-"]}),new portalui_arrayMap({items:["OK","-"]})]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,325,900,25],buttonStyle:2,grid:this.sg});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			
			this.e_nb.setSQL("select no_seleksi, keterangan from gr_rekrut_seleksi_m where kode_lokasi='"+this.app._lokasi+"'",["no_seleksi","keterangan"],false,["No Bukti","Keterangan"],"and","Data Seleksi",true);
			this.kode_seb = "";
			this.cb_proses.setSQL("select kode_proses, nama, kode_seb from gr_rekrut_proses where kode_lokasi='"+this.app._lokasi+"'",["kode_proses","nama","kode_seb"],false,["Kode","Nama","Kode Seblm"],"and","Data Proses Rekrutasi",true);			
			this.cb_lowong.setSQL("select kode_job, nama from gr_rekrut_job where kode_lokasi='"+this.app._lokasi+"'  and datediff(day,tgl_selesai,getdate()) < 30",["kode_job","nama"],false,["Kode","Nama"],"and","Data Lowongan",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siaga_hris_rekrut_fRekSeleksiE.extend(window.childForm);
window.app_saku3_transaksi_siaga_hris_rekrut_fRekSeleksiE.implement({
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
					sql.add("delete from gr_rekrut_seleksi_m where no_seleksi = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_rekrut_seleksi_d where no_seleksi = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					sql.add("insert into gr_rekrut_seleksi_m(no_seleksi,kode_lokasi,kode_proses,tanggal,keterangan,tgl_input,nik_user,kode_job) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_proses.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"',getdate(),'"+this.app._userLog+"','"+this.cb_lowong.getText()+"')");
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								if (this.sg.cells(4,i) == "OK") var flag_seleksi = this.cb_proses.getText();
								else var flag_seleksi = "-";
								sql.add("insert into gr_rekrut_seleksi_d(no_seleksi,kode_lokasi,kode_proses,kode_job,nip,flag_hadir,hasil,flag_seleksi) values "+  
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_proses.getText()+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(5,i)+"','"+this.sg.cells(3,i)+"','"+this.sg.cells(2,i)+"','"+flag_seleksi+"')");
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
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "hapus" :	
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from gr_rekrut_seleksi_m where no_seleksi = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("delete from gr_rekrut_seleksi_d where no_seleksi = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					setTipeButton(tbAllFalse);	
					this.dbLib.execArraySQL(sql);
				break;
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		this.periode = (y+""+m);
	},
	doChange:function(sender){
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider(
					   "select a.tanggal,b.kode_proses,b.nama,a.keterangan,a.kode_job "+
					   "from gr_rekrut_seleksi_m a inner join gr_rekrut_proses b on a.kode_proses=b.kode_proses and a.kode_lokasi=b.kode_lokasi "+
					   "where a.no_seleksi='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.dp_d1.setText(line.tanggal);									
					this.e_ket.setText(line.keterangan);
					this.cb_proses.setText(line.kode_proses);
					this.cb_lowong.setText(line.kode_job);
				} 
			}			
			var data = this.dbLib.getDataProvider(
						"select b.kode_job,b.nama,a.hasil,a.flag_hadir,a.flag_status,a.nip,c.nama as nama_nip,"+
						"case when c.alamat<>'' then c.alamat else '-' end as alamat,"+
						"case when c.sex<>'' then c.sex else '-' end as sex,"+
						"isnull(d.nama,'-') as pendidikan,isnull(f.nama,'-') as jurusan,"+
						"case when c.univ<>'' then c.univ else '-' end as univ,"+
						"case when c.ipk<>'' then c.ipk else 0 end as ipk "+
						"from gr_rekrut_seleksi_d a "+
						"     inner join gr_rekrut_job b on a.kode_job=b.kode_job and a.kode_lokasi=b.kode_lokasi "+
						"     inner join gr_rekrut_pelamar c on a.nip=c.nip and a.kode_lokasi=b.kode_lokasi "+
						"	  left join gr_strata d on c.kode_strata=d.kode_strata and c.kode_lokasi=d.kode_lokasi "+
						"	  left join gr_jur f on c.kode_jur = f.kode_jur and c.kode_lokasi = f.kode_lokasi "+
						"where a.no_seleksi = '"+this.e_nb.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_job,line.nama,line.hasil,line.flag_hadir,line.flag_status,line.nip,line.nama_nip,line.alamat,line.sex,line.pendidikan,line.jurusan,line.univ,floatToNilai(line.ipk)]);
				}
			} else this.sg.clear(1);
		}
		if (sender == this.cb_proses && this.cb_proses.getText()!="") {
			this.kode_seb = this.cb_proses.dataFromList[2];
		}
	},
	doEllipsClick: function(sender, col, row) {
		try
		{
			switch(col){
				case 0 :
						this.standarLib.showListDataForSG(this, "Daftar Lowongan",this.sg, this.sg.row, this.sg.col, 
														"select kode_job, nama  from gr_rekrut_job where kode_job='"+this.cb_lowong.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",
														"select count(kode_job) from gr_rekrut_job where kode_job='"+this.cb_lowong.getText()+"' and  kode_lokasi='"+this.app._lokasi+"'",
														 new Array("kode_job","nama"),"and",new Array("Kode","Nama"),false);					
						break;					

				case 5 :
						if (this.kode_seb == "-") {
							this.standarLib.showListDataForSG(this, "Daftar Pelamar",this.sg, this.sg.row, this.sg.col, 
															"select a.nip,a.nama    from gr_rekrut_pelamar a inner join gr_rekrut_job_pelamar b on a.nip=b.nip and a.kode_lokasi=b.kode_lokasi and b.kode_job='"+this.cb_lowong.getText()+"' where a.kode_lokasi='"+this.app._lokasi+"'",
															"select count(*) from (select a.nip,a.nama    from gr_rekrut_pelamar a inner join gr_rekrut_job_pelamar b on a.nip=b.nip and a.kode_lokasi=b.kode_lokasi and b.kode_job='"+this.cb_lowong.getText()+"' where a.kode_lokasi='"+this.app._lokasi+"')a",
															 new Array("nip","nama"),"and",new Array("NIP","Nama"),false);					
						}
						else {
							this.standarLib.showListDataForSG(this, "Daftar Pelamar",this.sg, this.sg.row, this.sg.col, 
															"select distinct a.nip,a.nama  from gr_rekrut_pelamar a inner join gr_rekrut_seleksi_d b on a.nip=b.nip and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"' and b.flag_seleksi='"+this.kode_seb+"'",
															"select count(distinct a.nip)  from gr_rekrut_pelamar a inner join gr_rekrut_seleksi_d b on a.nip=b.nip and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='"+this.app._lokasi+"' and b.flag_seleksi='"+this.kode_seb+"'",
															 new Array("a.nip","a.nama"),"and",new Array("NIP","Nama"),false);					
						}
						break;					
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},	
	doChangeCell: function(sender, col, row){
		if (col == 5 && this.sg.cells(5,row) != "") {
			this.sg.cells(0,row,this.cb_lowong.getText());
			this.sg.cells(1,row,this.cb_lowong.rightLabelCaption);
			
			var data = this.dbLib.getDataProvider("select alamat,sex,pendidikan,jurusan,univ,ipk from gr_rekrut_pelamar where nip ='"+this.sg.cells(5,row)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.sg.setCell(7,row,line.alamat);
					this.sg.setCell(8,row,line.sex);
					this.sg.setCell(9,row,line.pendidikan);
					this.sg.setCell(10,row,line.jurusan);
					this.sg.setCell(11,row,line.univ);
					this.sg.setCell(12,row,floatToNilai(line.ipk));
				}
				else{
					this.sg.setCell(7,row,"");
					this.sg.setCell(8,row,"");
					this.sg.setCell(8,row,"");
					this.sg.setCell(10,row,"");
					this.sg.setCell(11,row,"");
					this.sg.setCell(12,row,"0");
				}
			}
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