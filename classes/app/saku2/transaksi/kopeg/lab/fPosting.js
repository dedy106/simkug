window.app_saku2_transaksi_kopeg_lab_fPosting = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_lab_fPosting.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_lab_fPosting";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Posting Transaksi", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox;wysiwyg;portalui_saiMemo");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"],visible:false});
		this.l_tgl1 = new portalui_label(this,{bound:[20,12,100,18],caption:"Tanggal", underline:true,visible:false});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,12,100,18],selectDate:[this,"doSelectDate"],visible:false}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Posting",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_tugas = new saiCBBL(this,{bound:[20,16,220,20],caption:"No Tugas", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"] });
		this.c_modul = new saiCB(this,{bound:[20,22,200,20],caption:"Modul",items:["JU"], readOnly:true,tag:2,change:[this,"doChange"]});		
		this.i_postAll = new portalui_imageButton(this,{bound:[225,22,20,20],hint:"Posting All",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});		
		
		this.pc1 = new pageControl(this,{bound:[20,12,900,387], childPage:["Data Transaksi Modul","Detail Transaksi","Deskripsi Tugas","Rincian Tugas"]});
		this.sg = new saiGrid(this.pc1.childPage[0],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:7,tag:0,
		            colTitle:["Status","No Bukti","No Dokumen","Tanggal","Keterangan","Jenis","Tgl Koreksi"],
					colWidth:[[6,5,4,3,2,1,0],[80,50,300,70,120,120,80]],
					columnReadOnly:[true,[0,1,2,3,4,5],[6]],
					buttonStyle:[[0,6],[bsAuto,bsDate]], 
					picklist:[[0],[new portalui_arrayMap({items:["POSTING","INPROG"]})]],
					change:[this,"doChangeCells"],dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});		
		this.sg2 = new saiGrid(this.pc1.childPage[1],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:5,tag:9,
		            colTitle:["Kode Akun","Nama Akun","DC","Keterangan","Nilai"],
					colWidth:[[4,3,2,1,0],[100,350,50,200,80]],
					colFormat:[[4],[cfNilai]],readOnly: true,autoAppend:false,defaultRow:1});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg2});	
		
		
		this.e_dosen = new portalui_saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,400,20],caption:"Dosen",tag:2,readOnly:true});
		this.e_kajian = new portalui_saiLabelEdit(this.pc1.childPage[2],{bound:[450,11,400,20],caption:"Kajian",tag:2,readOnly:true});		
		this.e_kelas = new portalui_saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,400,20],caption:"Kelas",tag:2,readOnly:true});				
		this.e_matkul = new portalui_saiLabelEdit(this.pc1.childPage[2],{bound:[450,12,400,20],caption:"Mata Kuliah",tag:2,readOnly:true});		
		this.e_range = new portalui_saiLabelEdit(this.pc1.childPage[2],{bound:[20,11,400,20],caption:"Range Tanggal",tag:2,readOnly:true});		
		this.e_memo = new saiMemo(this.pc1.childPage[2],{bound:[5,10,this.pc1.width-10,this.pc1.height-90],caption:"",tag:2,labelWidth:0});						
		
		this.sg3 = new saiGrid(this.pc1.childPage[3],{bound:[0,10,this.pc1.width-5,this.pc1.height-40],colCount:5,tag:2,
		            colTitle:["Tanggal","Deskripsi","Jenis","ID Soal","Jml Jawab"],
					colWidth:[[4,3,2,1,0],[80,80,80,460,100]],						
					dblClick:[this,"doDoubleClick2"],readOnly:true, autoAppend:false,defaultRow:1});
		this.sgn3 = new portalui_sgNavigator(this.pc1.childPage[3],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});						
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[2].rearrangeChild(10, 23);	
		
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			this.c_modul.setText("");	
			if (this.app._userStatus=="M")
			{
				this.cb_tugas.setSQL("select a.no_tugas, a.nama from lab_tugas a "+
			                     "       inner join lab_kelas_mhs c on a.kode_kelas=c.kode_kelas and a.kode_lokasi=c.kode_lokasi and c.nim ='"+this.app._userLog+"' "+
								 "       left join lab_close b on a.no_tugas=b.no_tugas and a.kode_lokasi=b.kode_lokasi and b.nik_user='"+this.app._userLog+"' "+
								 "where b.no_tugas is null and a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"'",["no_tugas","nama"],false,["Kode","Nama"],"and","Daftar Tugas",true);			
			}
			else
			{
				this.cb_tugas.setSQL("select a.no_tugas, a.nama from lab_tugas a "+
								 "where a.flag_aktif ='1' and a.kode_lokasi='"+this.app._lokasi+"' and a.kode_dosen='"+this.app._userLog+"'",["no_tugas","nama"],false,["Kode","Nama"],"and","Daftar Tugas",true);

			}
			this.e_memo.setReadOnly(true);
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_lab_fPosting.extend(window.childForm);
window.app_saku2_transaksi_kopeg_lab_fPosting.implement({
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
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"lab_posting_m","no_post",this.app._lokasi+"-POST"+this.e_periode.getText().substr(2,4)+".","000"));			
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{													
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();					
					sql.add("insert into lab_posting_m(no_post,kode_lokasi,periode,tanggal,modul,keterangan,nik_buat,nik_app,no_del,tgl_input,nik_user,nilai,no_tugas) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+this.dp_d1.getDateString()+"','"+this.c_modul.getText()+"','"+this.e_ket.getText()+"','"+this.app_userLog+"','"+this.app._userLog+"','-',getdate(),'"+this.app._userLog+"',0,'"+this.cb_tugas.getText()+"')");
					var line;
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						line = this.dataJU.rs.rows[i];							
						if (line.status.toUpperCase() == "POSTING"){																																				
							if (line.tgl_koreksi == line.tanggal) {
								sql.add("insert into lab_posting_d(no_post,modul,no_bukti,status,catatan,no_del,kode_lokasi,periode,tgl_asal,tgl_koreksi) values "+
										"	('"+this.e_nb.getText()+"','"+line.jenis.toUpperCase()+"','"+line.no_bukti+"','"+line.status.toUpperCase()+"','-','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+line.tgl_asal+"','"+line.tgl_asal+"')");
							}
							else
							{
								sql.add("update lab_ju_m set tanggal='"+line.tgl_koreksi+"' where kode_lokasi='"+this.app._lokasi+"' and no_ju='"+line.no_bukti+"' and no_tugas='"+this.cb_tugas.getText()+"' and nik_user='"+this.app._userLog+"'"); 
								sql.add("update lab_ju_j set tanggal='"+line.tgl_koreksi+"' where kode_lokasi='"+this.app._lokasi+"' and no_ju='"+line.no_bukti+"' and no_tugas='"+this.cb_tugas.getText()+"' and nik_user='"+this.app._userLog+"'"); 							
								sql.add("insert into lab_posting_d(no_post,modul,no_bukti,status,catatan,no_del,kode_lokasi,periode,tgl_asal,tgl_koreksi) values "+
									"	('"+this.e_nb.getText()+"','"+line.jenis.toUpperCase()+"','"+line.no_bukti+"','"+line.status.toUpperCase()+"','-','-','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+line.tgl_asal+"','"+line.tgl_koreksi+"')");
							}
							
							sql.add("insert into lab_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,no_tugas) "+
									"select no_ju,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai,tgl_input,nik_user,no_tugas "+
									"from lab_ju_j where kode_lokasi='"+this.app._lokasi+"' and no_ju='"+line.no_bukti+"' and no_tugas='"+this.cb_tugas.getText()+"' and nik_user='"+this.app._userLog+"'");
							
							sql.add("update lab_ju_m set posted='T' where kode_lokasi='"+this.app._lokasi+"' and no_ju='"+line.no_bukti+"' and no_tugas='"+this.cb_tugas.getText()+"' and nik_user='"+this.app._userLog+"'"); 
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
					this.c_modul.setText("");					
					this.sg.setTag("0");
					this.dataJU.rs.rows = [];
					this.sg.clear(1); this.sg2.clear(1); 
					this.pc1.setActivePage(this.pc1.childPage[0]);
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"lab_posting_m","no_post",this.app._lokasi+"-POST"+this.e_periode.getText().substr(2,4)+".","000"));			
					setTipeButton(tbSimpan);
				break;
			case "simpan" :													
				var line;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];							
					if (line.tgl_koreksi != line.tanggal) {
						var data = this.dbLib.getDataProvider("select no_tugas from lab_tugas where '"+line.tgl_koreksi+"' between tgl_awal and tgl_akhir and no_tugas='"+this.cb_tugas.getText()+"' and kode_lokasi='"+this.app._lokasi+"'",true);
						if (typeof data == "object"){
							var line2 = data.rs.rows[0];							
							if (line2 == undefined){
								system.alert(this,"Transaksi tidak valid.","Tanggal transaksi Bukti "+line.no_bukti+" tidak dalam range tugas ("+this.e_range.getText()+").");
								return false;						
							} 
						}
					}
				}				
				var isAda = false;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					if (this.dataJU.rs.rows[i].status == "POSTING") isAda = true;
				}
				if (!isAda){
					system.alert(this,"Transaksi tidak valid.","Tidak ada transaksi dengan status POSTING.");
					return false;
				}
				else this.simpan();																				
				break;				
			case "simpancek" : 
				this.simpan();			
				break;			
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"lab_posting_m","no_post",this.app._lokasi+"-POST"+this.e_periode.getText().substr(2,4)+".","00000"));			
	},
	doClick:function(sender){
		if (sender == this.i_gen) {
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"lab_posting_m","no_post",this.app._lokasi+"-POST"+this.e_periode.getText().substr(2,4)+".","00000"));
			this.e_ket.setFocus();
		}
		if (sender == this.i_postAll) {
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].status = "POSTING";
			}
			this.doTampilData(this.page);
		}
	},
	doChange:function(sender){
		if (sender == this.e_periode) {
			this.dataJU.rs.rows = [];
			this.sg.clear(1); this.sg2.clear(1);
		}
		if (sender == this.cb_tugas && this.cb_tugas.getText() != "") {
			var data = this.dbLib.getDataProvider("select a.keterangan,b.nama as dosen,c.matkul,d.nama as kelas,d.kode_kelas,c.nama+' - '+c.keterangan as kajian, convert(varchar,a.tgl_awal,103)+' - '+convert(varchar,a.tgl_akhir,103) as tgl_range "+
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
					this.e_range.setText(line.tgl_range);					
					this.e_memo.setText(line.keterangan);					
				} 
			}			
			var data = this.dbLib.getDataProvider("select a.nu,a.tanggal,a.keterangan,a.jenis,isnull(b.jml,0) as jml "+					
					   "from lab_tugas_d a left join ("+
					   "             select no_tugas,kode_lokasi,id_soal,count(id_soal) as jml "+
					   "             from lab_ju_m where nik_user='"+this.app._userLog+"' and no_tugas='"+this.cb_tugas.getText()+"' and kode_lokasi='"+this.app._lokasi+"' "+
					   "             group by no_tugas,kode_lokasi,id_soal) b on a.no_tugas=b.no_tugas and a.kode_lokasi=b.kode_lokasi and a.nu=b.id_soal "+					   
					   "where a.no_tugas='"+this.cb_tugas.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.nu",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg3.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg3.appendData([line.tanggal,line.keterangan,line.jenis,line.nu,line.jml]);
				}
			} else this.sg3.clear(1);						
		}
		
		if (sender == this.c_modul || sender == this.cb_tugas) {			
			if (this.c_modul.getText() != "" && this.cb_tugas.getText() != "") {				
				var strSQL = "";
				switch(this.c_modul.getText()){
					case "JU" :
								strSQL = "select 'INPROG' as status,no_ju as no_bukti,no_dokumen,convert(varchar,tanggal,103) as tanggal,keterangan,'JU' as jenis,tanggal as tgl_asal,convert(varchar,tanggal,103) as tgl_koreksi "+
										 "from lab_ju_m "+
										 "where posted='F' and kode_lokasi='"+this.app._lokasi+"' and no_tugas='"+this.cb_tugas.getText()+"' and nik_user='"+this.app._userLog+"'";  								
						break;					
				}
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					this.dataJU = data;
					this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
					this.sgn.rearrange();
					this.doTampilData(1);
				} else this.sg.clear(1);
			}
		}		
	},
	doTampilData: function(page) {		
		this.sg.clear(); this.sg2.clear(1);
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.status.toUpperCase(),line.no_bukti,line.no_dokumen,line.tanggal,line.keterangan,line.jenis.toUpperCase(),line.tgl_koreksi]);
		}
		this.sg.setNoUrut(start);		
	},
	doChangeCells: function(sender, col , row) {
		if (col == 0) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].status = this.sg.cells(0,row);			
		}
		if (col == 6) {
			this.dataJU.rs.rows[((this.page-1)*20) + row].tgl_koreksi = this.sg.getCellDateValue(6,row);
		}
	},
	doDoubleClick: function(sender, col , row) {
		if (this.sg.cells(1,row) != "" && this.sg.cells(5,row) != "") {
			var strSQL = "";
			switch(this.sg.cells(5,row)){
				case "JU" :
							strSQL = "select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan,a.nilai "+
									 "from lab_ju_j a inner join lab_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and a.no_tugas=b.no_tugas and a.nik_user=b.nik_user "+
									 "where a.no_ju = '"+this.sg.cells(1,row)+"' and a.kode_lokasi='"+this.app._lokasi+"'";
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
			this.pc1.setActivePage(this.pc1.childPage[1]);
		}
	},	
	doPager: function(sender, page) {
		this.doTampilData(page);
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
	}
});