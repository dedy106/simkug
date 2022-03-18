window.app_saku2_transaksi_kopeg_lab_fReview = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_lab_fReview.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_lab_fReview";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Evaluasi dan Nilai: Input", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;wysiwyg;portalui_saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true,visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,10,100,18],caption:"Tanggal", underline:true,visible:false});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,10,100,18],selectDate:[this,"doSelectDate"],visible:false}); 		
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"No Eval",maxLength:30,readOnly:true,visible:false});		

		this.cb_tugas = new saiCBBL(this,{bound:[20,10,222,20],caption:"No Tugas", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});		
		this.e_dosen = new portalui_saiLabelEdit(this,{bound:[20,13,400,20],caption:"Dosen",tag:2,readOnly:true});
		this.e_kajian = new portalui_saiLabelEdit(this,{bound:[20,14,400,20],caption:"Kajian",tag:2,readOnly:true});
		this.e_matkul = new portalui_saiLabelEdit(this,{bound:[520,14,400,20],caption:"Mata Kuliah",tag:2,readOnly:true});
		this.e_kelas = new portalui_saiLabelEdit(this,{bound:[20,15,400,20],caption:"Kelas",tag:2,readOnly:true});
		this.e_rangetgl = new portalui_saiLabelEdit(this,{bound:[520,15,400,20],caption:"Tanggal Dr - Sd",tag:2,readOnly:true});
		
		this.pc1 = new pageControl(this,{bound:[10,18,1000,370], childPage:["Deskripsi Tugas","Rincian Tugas","Data Mahasiswa","Detail Tugas","Data Jurnal","Catatan","Filter Data"]});		
		this.e_memo2 = new saiMemo(this.pc1.childPage[0],{bound:[5,10,this.pc1.width-10,this.pc1.height-20],caption:"",labelWidth:0, tag:2});				
		this.sg3 = new saiGrid(this.pc1.childPage[1],{bound:[0,10,this.pc1.width-5,this.pc1.height-40],colCount:4,tag:2,
		            colTitle:["Tanggal","Deskripsi","ID Soal","Jenis"],colWidth:[[3,2,1,0],[80,80,520,100]],readOnly:true, autoAppend:false,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg3});		
		
		this.sg = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:7,tag:0,
		            colTitle:["N I M","Nama","Tanggal","No Close","Catatan","No Eval","Nilai"],
					colWidth:[[6,5,4,3,2,1,0],[80,100,200,100,80,250,100]],readOnly:true,dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
				
		this.e_nilai = new saiLabelEdit(this.pc1.childPage[3],{bound:[20,16,200,20],caption:"Nilai",maxLength:10});										
		this.e_mhs = new saiLabelEdit(this.pc1.childPage[3],{bound:[520,16,450,20],caption:"Mahasiswa",readOnly:true});										
		this.e_memo = new saiMemo(this.pc1.childPage[3],{bound:[20,12,450,50],caption:"Catatan"});
		this.e_noclose = new saiLabelEdit(this.pc1.childPage[3],{bound:[520,12,200,20],caption:"No Close",readOnly:true});										
		this.sg1 = new saiGrid(this.pc1.childPage[3],{bound:[1,10,this.pc1.width-5,this.pc1.height-140],colCount:6,tag:9,
		            colTitle:["No Bukti","ID Soal","Tanggal","Keterangan","Jenis","Posted"],
					colWidth:[[5,4,3,2,1,0],[80,50,300,70,200,150]],
					columnReadOnly:[true,[0,1,2,3,4,5],[]],
					dblClick:[this,"doDoubleClick1"],autoAppend:false,defaultRow:1});
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager1"]});		
		
		this.e_soal = new saiMemo(this.pc1.childPage[4],{bound:[20,13,800,50],caption:"Soal",tag:9});				
		this.sg2 = new saiGrid(this.pc1.childPage[4],{bound:[1,10,this.pc1.width-5,this.pc1.height-120],colCount:5,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai"],
					colWidth:[[4,3,2,1,0],[100,400,50,200,80]],
					colFormat:[[4],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[4],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});	
		
		this.mCatat = new wysiwyg(this.pc1.childPage[5],{bound:[1,10,this.pc1.width-25,this.pc1.height-125], withForm:false, tag:9});
		this.mCatat.display();
		this.mCatat.enable();
			
		this.e_npm = new saiLabelEdit(this.pc1.childPage[6],{bound:[20,11,200,20],caption:"N I M",tag:9});		
		this.bCari = new button(this.pc1.childPage[6],{bound:[230,11,80,18],caption:"Cari Data",click:[this,"doCari"]});			
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[3].rearrangeChild(10, 23);			
		this.pc1.childPage[4].rearrangeChild(10, 23);			
		this.pc1.childPage[6].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);		
		this.maximize();		
		this.setTabChildIndex();		
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();					
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.cb_tugas.setSQL("select a.no_tugas, a.nama from lab_tugas a where a.kode_dosen='"+this.app._userLog+"' and a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["no_tugas","nama"],false,["Kode","Nama"],"and","Daftar Tugas",true);
			
			this.e_memo2.setReadOnly(true);
			this.e_soal.setReadOnly(true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_lab_fReview.extend(window.childForm);
window.app_saku2_transaksi_kopeg_lab_fReview.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"lab_eval","no_eval",this.app._lokasi+"-EVL.","000000"));
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					sql.add("update lab_close set no_eval='"+this.e_nb.getText()+"', nilai='"+this.e_nilai.getText()+"',evaluasi='"+this.e_memo.getText()+"' where no_close='"+this.e_noclose.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");										
					sql.add("insert into lab_eval(no_eval,kode_lokasi,tanggal,no_close,nik_user,tgl_input,nilai,catatan) values "+
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_noclose.getText()+"','"+this.app._userLog+"',getdate(),'"+this.e_nilai.getText()+"','"+this.e_memo.getText()+"')");															
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
					this.sg.clear(1); this.sg1.clear(1); this.sg2.clear(1); this.sg3.clear(1); 
					this.doLoad();
					this.e_memo.setText("-");
					this.pc1.setActivePage(this.pc1.childPage[0]);											
					setTipeButton(tbSimpan);
				break;
			case "simpan" :
				this.sg1.validasi();				
				if (this.e_noclose.getText()=="-") {
					system.alert(this,"Transaksi tidak valid.","Tugas Belum di CLOSE Mahasiswa.");
					return false;
				}
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
		this.doClick(this.i_gen);
		this.doLoad();
	},	
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"lab_eval","no_eval",this.app._lokasi+"-EVL.","000000"));
		}		
	},		
	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg.cells(0,row) != "") {	
				if (this.sg.cells(5,row) != "-") {	
					system.alert(this,"Data sudah di-evaluasi.","Pilih NIM Mahasiswa Lainnya.");
				}
				else {
					this.e_mhs.setText(this.sg.cells(0,row)+" - "+this.sg.cells(1,row));
					this.e_noclose.setText(this.sg.cells(3,row));
					this.npm = this.sg.cells(0,row);
					
					this.sg2.clear(1); 
					strSQL = "select no_ju as no_bukti,id_soal,convert(varchar,tanggal,103) as tanggal,keterangan,'JU' as jenis,case posted when 'T' then 'POSTED' else 'UNPOSTED' end as posted "+
							 "from lab_ju_m "+
							 "where kode_lokasi='"+this.app._lokasi+"' and no_tugas='"+this.cb_tugas.getText()+"' and nik_user='"+this.sg.cells(0,row)+"'";
					var data = this.dbLib.getDataProvider(strSQL,true);
					if (typeof data == "object" && data.rs.rows[0] != undefined){
						this.dataJU1 = data;
						this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
						this.sgn1.rearrange();
						this.doTampilData1(1);
					} else this.sg1.clear(1);					
					this.pc1.setActivePage(this.pc1.childPage[3]);											
				}
			}
		} catch(e) {alert(e);}
	},
	doDoubleClick1: function(sender, col , row) {
		if (this.sg1.cells(0,row) != "" && this.sg1.cells(4,row) != "") {
			var strSQL = "";
			switch(this.sg1.cells(4,row)){
				case "JU" :
						strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai,c.catatan,cast(d.nu as varchar)+' - '+d.tanggal+' - '+d.keterangan as soal "+
								 "from lab_ju_j a inner join lab_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and a.no_tugas=b.no_tugas and a.nik_user=b.nik_user "+
								 "                inner join lab_ju_m c on a.no_ju=c.no_ju and a.kode_lokasi=c.kode_lokasi and a.nik_user=c.nik_user "+
								 "                inner join lab_tugas_d d on c.no_tugas=d.no_tugas and d.nu=c.id_soal and d.kode_lokasi=c.kode_lokasi "+
								 "where a.no_ju = '"+this.sg1.cells(0,row)+"' and a.kode_lokasi='"+this.app._lokasi+"' order by c.id_soal ";
					break;				
			}
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg2.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg2.appendData([line.kode_akun,line.nama_akun,line.dc,line.keterangan,floatToNilai(line.nilai)]);
				}
			} else this.sg2.clear(1);
			this.mCatat.setCode(urldecode(line.catatan));
			this.e_soal.setText(line.soal);
			this.pc1.setActivePage(this.pc1.childPage[4]);			
		}
	},
	doLoad:function(sender){						
		var strSQL = "select a.nim,c.nama,isnull(convert(varchar,d.tanggal,103),'-') as tgl,isnull(d.catatan,'-') as catatan,isnull(d.no_close,'-') as no_close,isnull(d.no_eval,'-') as no_eval,isnull(d.nilai,'-') as nilai "+
		             "from lab_kelas_mhs a inner join lab_tugas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi "+
					 "                     inner join lab_mhs c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi "+
					 "                     left join lab_close d on a.nim=d.nik_user and a.kode_lokasi=d.kode_lokasi and d.no_tugas='"+this.cb_tugas.getText()+"' "+
					 "where b.no_tugas='"+this.cb_tugas.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"'";
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
		if (this.e_npm.getText()!="") filter = " and c.nim like '"+this.e_npm.getText()+"%' ";		
		if (filter != "") {
			var strSQL = "select a.nim,c.nama,isnull(convert(varchar,d.tanggal,103),'-') as tgl,isnull(d.catatan,'-') as catatan,isnull(d.no_close,'-') as no_close,isnull(d.no_eval,'-') as no_eval,isnull(d.nilai,'-') as nilai  "+
						 "from lab_kelas_mhs a inner join lab_tugas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi "+
						 "                     inner join lab_mhs c on a.nim=c.nim and a.kode_lokasi=c.kode_lokasi "+
						 "                     left join lab_close d on a.nim=d.nik_user and a.kode_lokasi=d.kode_lokasi and d.no_tugas='"+this.cb_tugas.getText()+"' "+
						 "where b.no_tugas='"+this.cb_tugas.getText()+"' and b.kode_lokasi='"+this.app._lokasi+"' "+filter;
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);			
		}
		this.pc1.setActivePage(this.pc1.childPage[2]);
	},
	doTampilData: function(page) {
		this.sg.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg.appendData([line.nim,line.nama,line.tgl,line.no_close,line.catatan,line.no_eval,line.nilai]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doTampilData1: function(page) {
		this.sg1.clear();
		var line1;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU1.rs.rows.length? this.dataJU1.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line1 = this.dataJU1.rs.rows[i];													
			this.sg1.appendData([line1.no_bukti,line1.id_soal,line1.tanggal,line1.keterangan,line1.jenis.toUpperCase(),line1.posted.toUpperCase()]);
		}
		this.sg1.setNoUrut(start);
	},
	doPager1: function(sender, page) {
		this.doTampilData1(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},	
	doChange:function(sender){
		if (sender == this.cb_tugas && this.cb_tugas.getText()!="") {
			var data = this.dbLib.getDataProvider("select a.keterangan,b.nama as dosen,c.nama+' - '+c.keterangan as kajian,c.matkul,d.nama as kelas,convert(varchar,a.tgl_mulai,103)+' - '+convert(varchar,a.tgl_selesai,103) as tgl "+
					   "from lab_tugas a inner join lab_dosen b on a.kode_dosen=b.kode_dosen and a.kode_lokasi=b.kode_lokasi "+
					   "                 inner join lab_matkul c on a.kode_matkul=c.kode_matkul and a.kode_lokasi=c.kode_lokasi "+
					   "                 inner join lab_kelas d on a.kode_kelas=d.kode_kelas and a.kode_lokasi=d.kode_lokasi "+
					   "where a.no_tugas='"+this.cb_tugas.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.e_dosen.setText(line.dosen);
					this.e_kajian.setText(line.kajian);
					this.e_matkul.setText(line.matkul);
					this.e_kelas.setText(line.kelas);					
					this.e_memo2.setText(line.keterangan);
					this.e_rangetgl.setText(line.tgl);
				} 
			}
			var data = this.dbLib.getDataProvider("select tanggal,keterangan,nu,jenis from lab_tugas_d where no_tugas='"+this.cb_tugas.getText()+"' and kode_lokasi='"+this.app._lokasi+"' order by nu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg3.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg3.appendData([line.tanggal,line.keterangan,line.nu,line.jenis]);
				}
			} else this.sg3.clear(1);												
			this.doLoad();
		}
	}
});