window.app_rra_transaksi_fRRRrev = function(owner)
{
	if (owner)
	{
		window.app_rra_transaksi_fRRRrev.prototype.parent.constructor.call(this,owner);
		this.className  = "app_rra_transaksi_fRRRrev";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form PRDRK Redistribusi, Realokasi, Reschedule Anggaran: Review", 0);	
		
		uses("saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;wysiwyg");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,202,20],caption:"Periode",tag:2,readOnly:true});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"],date:new Date().getDateStr()}); 
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,202,20],caption:"No Review",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});				
		this.e_ket = new saiLabelEdit(this,{bound:[20,14,450,20],caption:"Keterangan", maxLength:150});		
		this.cb_pdrk = new saiCBBL(this,{bound:[20,13,222,20],caption:"No PDRK", multiSelection:false, tag:1, change:[this,"doChange"]});		
		this.e_modul = new saiLabelEdit(this,{bound:[20,15,202,20],caption:"Modul", readOnly:true});		
		this.e_donor = new saiLabelEdit(this,{bound:[720,15,200,20],caption:"Nilai Donor", readOnly:true, tipeText:ttNilai, text:"0"});		
		this.c_jenis = new saiLabelEdit(this,{bound:[20,14,202,20],caption:"Jenis", readOnly:true});		
		this.e_terima = new saiLabelEdit(this,{bound:[720,14,200,20],caption:"Nilai Penerima", readOnly:true, tipeText:ttNilai, text:"0"});		
		this.pc1 = new pageControl(this,{bound:[20,16,900, 330], childPage:["Data PDRK","Data Donor","Data Penerima","Data Justifikasi"]});
		
		this.cb_ubis = new saiCBBL(this.pc1.childPage[0],{bound:[20,10,200,20],caption:"Png Jawab", multiSelection:false, maxLength:10, tag:1});
		this.cb_gubis = new saiCBBL(this.pc1.childPage[0],{bound:[20,11,200,20],caption:"Direktorat", multiSelection:false, maxLength:10, tag:1});
		this.cb_app1 = new saiCBBL(this.pc1.childPage[0],{bound:[20,14,200,20],caption:"NIK Png Jawab", multiSelection:false, maxLength:10, tag:1});
		this.cb_app2 = new saiCBBL(this.pc1.childPage[0],{bound:[20,15,200,20],caption:"NIK Mengetahui", multiSelection:false, maxLength:10, tag:1});
		this.cb_app3 = new saiCBBL(this.pc1.childPage[0],{bound:[20,16,200,20],caption:"NIK Menetapkan", multiSelection:false, maxLength:10, tag:1});
		
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[1,15,this.pc1.width-5,this.pc1.height-40],colCount:11,tag:9,
		            colTitle:["Bulan","Kode CC","Nama CC","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Nilai Gar","Terpakai","Saldo","Nilai Donor"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[90,90,90,90,90,70,60,60,90,70,50]],
					columnReadOnly:[true,[0,1,2,3,4,5,6,7,8,9],[10]],
					buttonStyle:[[0,1,3,5],[bsAuto,bsEllips,bsEllips,bsEllips]], 
					colFormat:[[7,8,9,10],[cfNilai,cfNilai,cfNilai,cfNilai]],
					picklist:[[0],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]})]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});
		this.sg2 = new saiGrid(this.pc1.childPage[2],{bound:[1,10,this.pc1.width-5,this.pc1.height-40],colCount:9,tag:0,
					colTitle:["Bulan","Kode CC","Nama CC","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Nilai ABT","Target"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[100,130,150,70,60,60,150,70,50]],
					columnReadOnly:[true,[0,1,2,3,4,5,6],[7,8]],
					buttonStyle:[[0,1,3,5],[bsAuto,bsEllips,bsEllips,bsEllips]], 
					colFormat:[[7],[cfNilai]],
					picklist:[[0],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]})]],
					defaultRow:1,
					ellipsClick:[this,"doEllipsClick2"],change:[this,"doChangeCell2"],nilaiChange:[this,"doNilaiChange2"],autoAppend:true});
		this.sgn2 = new portalui_sgNavigator(this.pc1.childPage[2],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg2});
		uses("wysiwyg",true);
		this.mDesk = new wysiwyg(this.pc1.childPage[3],{bound:[1,10,this.pc1.width-25,this.pc1.height-125], withForm:false});
		this.mDesk.display();
		this.mDesk.enable();

		this.rearrangeChild(10, 22);
		this.pc1.childPage[0].rearrangeChild(10, 22);
		this.pc1.childPage[1].rearrangeChild(10, 22);
		this.pc1.childPage[2].rearrangeChild(10, 22);
		this.pc1.childPage[3].rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();		
			
			this.cb_pdrk.setSQL("select no_pdrk,keterangan from rra_pdrk_m where progress='0' and kode_lokasi='"+this.app._lokasi+"'",["no_pdrk","keterangan"],false,["No PDRK","Keterangan"],"and","Data PDRK",true);
			this.cb_ubis.setSQL("select kode_ubis, nama from rra_ubis where kode_lokasi='"+this.app._lokasi+"'",["kode_ubis","nama"],false,["Kode","Nama"],"and","Data Penanggungjawab Program",true);
			this.cb_gubis.setSQL("select kode_gubis, nama from rra_gubis where kode_lokasi='"+this.app._lokasi+"'",["kode_gubis","nama"],false,["Kode","Nama"],"and","Data Direktorat",true);			
			this.cb_app1.setSQL("select nik, nama from rra_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan ",true);
			this.cb_app2.setSQL("select nik, nama from rra_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);
			this.cb_app3.setSQL("select nik, nama from rra_karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data Karyawan",true);

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_rra_transaksi_fRRRrev.extend(window.childForm);
window.app_rra_transaksi_fRRRrev.implement({
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
			if (this.e_modul.getText() != "ABT") this.sg.setTag("0"); else this.sg.setTag("9");
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{									
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_rev_m","no_rev","REV-"+this.e_periode.getText().substr(2,4)+".","0000"));					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();								
					sql.add("update rra_pdrk_m set progress='1' where no_pdrk='"+this.cb_pdrk.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					sql.add("insert into rra_rev_m(no_rev,kode_lokasi,no_pdrk,kode_ubis,kode_gubis,jenis_agg,tanggal,periode,nik_buat,nik_app1,nik_app2,nik_app3,sts_pdrk,justifikasi,nik_user,tgl_input,progress,keterangan,flag_rfc) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.cb_pdrk.getText()+"','"+this.cb_ubis.getText()+"','"+this.cb_gubis.getText()+"','"+this.c_jenis.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"','"+this.cb_app1.getText()+"','"+this.cb_app2.getText()+"','"+this.cb_app3.getText()+"','"+this.e_modul.getText()+"','"+urlencode(this.mDesk.getCode())+"','"+this.app._userLog+"',now(),'0','"+this.e_ket.getText()+"','0')");
										
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into rra_rev_d(no_rev,no_pdrk,kode_lokasi,no_urut,kode_akun,kode_cc,kode_drk,periode,nilai_gar,nilai_pakai,saldo,nilai,dc,target) values "+
										"	('"+this.e_nb.getText()+"','"+this.cb_pdrk.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(5,i)+"','"+this.sg.cells(1,i)+"','"+this.sg.cells(3,i)+"','"+this.e_periode.getText().substr(0,4)+this.sg.cells(0,i)+"',"+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(8,i))+","+parseNilai(this.sg.cells(9,i))+","+parseNilai(this.sg.cells(10,i))+",'C','-')");
							}
						}
					}
					if (this.sg2.getRowValidCount() > 0){
						for (var i=0;i < this.sg2.getRowCount();i++){
							if (this.sg2.rowValid(i)){
								sql.add("insert into rra_rev_d(no_rev,no_pdrk,kode_lokasi,no_urut,kode_akun,kode_cc,kode_drk,periode,nilai_gar,nilai_pakai,saldo,nilai,dc,target) values "+
										"	('"+this.e_nb.getText()+"','"+this.cb_pdrk.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg2.cells(5,i)+"','"+this.sg2.cells(1,i)+"','"+this.sg2.cells(3,i)+"','"+this.e_periode.getText().substr(0,4)+this.sg2.cells(0,i)+"',0,0,0,"+parseNilai(this.sg2.cells(7,i))+",'D','"+this.sg2.cells(8,i)+"')");
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
					this.sg.clear(1); this.sg2.clear(1);
					this.pc1.setActivePage(this.pc1.childPage[0]);
					setTipeButton(tbSimpan);
				break;
			case "simpan" :	
				this.sg2.validasi();
				if (this.e_modul.getText() != "ABT") {
					this.sg.validasi();
					if (nilaiToFloat(this.e_donor.getText()) != nilaiToFloat(this.e_terima.getText()) )  {
						system.alert(this,"Transaksi tidak valid.","Nilai Donor dan Terima harus sama.");
						return false;						
					}
					for (var i=0;i < this.sg.getRowCount();i++){
						if (this.sg.rowValid(i)){
							if (nilaiToFloat(this.sg.cells(10,i)) > nilaiToFloat(this.sg.cells(9,i))) {
								var k = i+1;
								system.alert(this,"Transaksi Donor tidak valid.","Nilai Donor melebihi Saldo Anggaran [Baris: "+k+"]");
								return false;						
							}
							for (var j=i;j < this.sg.getRowCount();j++){
								if (this.sg.cells(0,j) == this.sg.cells(0,i) && this.sg.cells(1,j) == this.sg.cells(1,i) && this.sg.cells(5,j) == this.sg.cells(5,i) && (i != j)) {
									var k = i+1;
									system.alert(this,"Transaksi Donor tidak valid.","Duplikasi Data Anggaran.[Baris : "+k+"]");
									return false;
								}
							}
						}
					}
				}
				for (var j=i;j < this.sg2.getRowCount();j++){
					if (this.sg2.cells(0,j) == this.sg2.cells(0,i) && this.sg2.cells(1,j) == this.sg2.cells(1,i) && this.sg2.cells(5,j) == this.sg2.cells(5,i) && (i != j)) {
						var k = i+1;
						system.alert(this,"Transaksi Terima tidak valid.","Duplikasi Data Anggaran.[Baris : "+k+"]");
						return false;
					}
				}								
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
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"rra_rev_m","no_rev","REV-"+this.e_periode.getText().substr(2,4)+".","0000"));
		this.e_ket.setFocus();
	},
	doChange:function(sender){
		if (sender == this.cb_pdrk && this.cb_pdrk.getText()!="") {
			var data = this.dbLib.getDataProvider(
			           "select a.jenis_agg,a.kode_ubis,a.kode_gubis,a.nik_app1,a.nik_app2,a.nik_app3,b.nama as nama_ubis,c.nama as nama_gubis,d.nama as nama_app1,e.nama as nama_app2,f.nama as nama_app3,a.justifikasi,a.sts_pdrk  "+
			           "from rra_pdrk_m a inner join rra_ubis b on a.kode_ubis=b.kode_ubis and a.kode_lokasi=b.kode_lokasi "+
					   "                  inner join rra_gubis c on a.kode_gubis=c.kode_gubis and a.kode_lokasi=c.kode_lokasi "+
					   "                  inner join rra_karyawan d on a.nik_app1=d.nik and a.kode_lokasi=d.kode_lokasi "+
					   "                  inner join rra_karyawan e on a.nik_app2=e.nik and a.kode_lokasi=e.kode_lokasi "+
					   "                  inner join rra_karyawan f on a.nik_app3=f.nik and a.kode_lokasi=f.kode_lokasi "+
					   "where a.no_pdrk='"+this.cb_pdrk.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){
					this.e_modul.setText(line.sts_pdrk);
					this.c_jenis.setText(line.jenis_agg);
					this.cb_ubis.setText(line.kode_ubis,line.nama_ubis);
					this.cb_gubis.setText(line.kode_gubis,line.nama_gubis);
					this.cb_app1.setText(line.nik_app1,line.nama_app1);
					this.cb_app2.setText(line.nik_app2,line.nama_app2);
					this.cb_app3.setText(line.nik_app3,line.nama_app3);
					this.mDesk.setCode(urldecode(line.justifikasi));
				} 
			}
			
			this.sg.clear(); this.sg2.clear();
			var strSQL = "select substring(a.periode,5,2) as bulan,a.kode_cc,b.nama as nama_cc,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.kode_akun,c.nama as nama_akun,a.nilai_gar,a.nilai_pakai,a.saldo,a.nilai,a.dc,a.target "+
			             "from rra_pdrk_d a inner join rra_cc b on a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi "+
						 "					inner join rra_masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi "+
						 "					left join rra_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun=substring(a.periode,1,4)  "+
			             "where a.no_pdrk = '"+this.cb_pdrk.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' order by a.dc";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					if (line.dc.toUpperCase() == "C")
						this.sg.appendData([line.bulan,line.kode_cc,line.nama_cc,line.kode_drk,line.nama_drk,line.kode_akun,line.nama_akun,floatToNilai(line.nilai_gar),floatToNilai(line.nilai_pakai),floatToNilai(line.saldo),floatToNilai(line.nilai)]);
					else this.sg2.appendData([line.bulan,line.kode_cc,line.nama_cc,line.kode_drk,line.nama_drk,line.kode_akun,line.nama_akun,floatToNilai(line.nilai),line.target]);
				}
			} else {
				this.sg.clear(1);
				this.sg2.clear(1);
			}
			
			if (this.e_modul.getText() == "ABT") this.sg.clear(1);
		}
	},
	doChangeCell: function(sender, col, row) {
		if (col == 0 || col == 1 || col == 3 || col == 5) {		
			if (this.sg.cells(0,row) != "" && this.sg.cells(1,row) != "" && this.sg.cells(3,row) != "" && this.sg.cells(5,row) != "") {
				var data = this.dbLib.getDataProvider("select a.sawal,isnull(b.pakai,0) as pakai,a.sawal-isnull(b.pakai,0) as sisa "+
							"from "+
							"( "+
							"		select kode_lokasi,kode_akun,kode_cc,sum(nilai) as sawal from rra_anggaran "+
							"		where "+
							"		kode_akun = '"+this.sg.cells(5,row)+"' and periode = '"+this.e_periode.getText().substr(0,4)+this.sg.cells(0,row)+"' and kode_cc = '"+this.sg.cells(1,row)+"' and kode_drk = '"+this.sg.cells(3,row)+"' and kode_lokasi= '"+this.app._lokasi+"' and DC='D' and no_bukti <> '"+this.cb_pdrk.getText()+"' "+
							"		group by kode_lokasi,kode_akun,kode_cc "+
							") a left join "+
							"( "+
							"		select kode_lokasi,kode_akun,kode_cc,sum(nilai) as pakai from rra_anggaran "+
							"		where  "+
							"		kode_akun = '"+this.sg.cells(5,row)+"' and periode = '"+this.e_periode.getText().substr(0,4)+this.sg.cells(0,row)+"' and kode_cc = '"+this.sg.cells(1,row)+"'  and kode_drk = '"+this.sg.cells(3,row)+"' and kode_lokasi= '"+this.app._lokasi+"' and DC='C' and no_bukti <> '"+this.cb_pdrk.getText()+"' "+
									"group by kode_lokasi,kode_akun,kode_cc "+
							") b on a.kode_akun=b.kode_akun and a.kode_cc=b.kode_cc and a.kode_lokasi=b.kode_lokasi",true);
				if (typeof data == "object"){
					var line = data.rs.rows[0];							
					if (line != undefined){
						this.sg.setCell(7,row,floatToNilai(line.sawal));
						this.sg.setCell(8,row,floatToNilai(line.pakai));
						this.sg.setCell(9,row,floatToNilai(line.sisa));
					} else {
						this.sg.setCell(7,row,"0");
						this.sg.setCell(8,row,"0");
						this.sg.setCell(9,row,"0");
					}
				}
			}
		}
		if (col == 10) this.sg.validasi();
	},
	doChangeCell2: function(sender, col, row) {
		if (col == 7) this.sg2.validasi();
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.getCell(10,i) != ""){
					tot += nilaiToFloat(this.sg.getCell(10,i));			
				}
			}
			this.e_donor.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doNilaiChange2: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg2.rows.getLength();i++){
				if (this.sg2.rowValid(i) && this.sg2.getCell(7,i) != ""){
					tot += nilaiToFloat(this.sg2.getCell(7,i));			
				}
			}
			this.e_terima.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},
	doEllipsClick: function(sender, col, row) {
		try{
			if (this.e_modul.getText() != "ABT") {
				switch(col){
					case 1 :
							this.standarLib.showListDataForSG(this, "Daftar Cost Center",this.sg, this.sg.row, this.sg.col, 
															"select kode_cc, nama  from rra_cc where kode_ubis = '"+this.cb_ubis.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
															"select count(kode_cc) from rra_cc where kode_ubis = '"+this.cb_ubis.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
															 new Array("kode_cc","nama"),"and",new Array("Kode","Nama"),false);					
							break;					
					case 3 :
							this.standarLib.showListDataForSG(this, "Daftar DRK",this.sg, this.sg.row, this.sg.col, 
															"select kode_drk, nama  from rra_drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi = '"+this.app._lokasi+"'",
															"select count(kode_drk) from rra_drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi = '"+this.app._lokasi+"'",
															 new Array("kode_drk","nama"),"and",new Array("Kode","Nama"),true);					
							break;					
					case 5 :
							this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg, this.sg.row, this.sg.col, 
															"select kode_akun, nama  from rra_masakun where kode_lokasi = '"+this.app._lokasi+"'",
															"select count(kode_akun) from rra_masakun where kode_lokasi = '"+this.app._lokasi+"'",
															 new Array("kode_akun","nama"),"and",new Array("Kode","Nama"),false);					
							break;					
							
				}						
			}
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},
	doEllipsClick2: function(sender, col, row) {
		try{
			switch(col){
				case 1 :
						this.standarLib.showListDataForSG(this, "Daftar Cost Center",this.sg2, this.sg2.row, this.sg2.col, 
														"select kode_cc, nama  from rra_cc where kode_ubis = '"+this.cb_ubis.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
														"select count(kode_cc) from rra_cc where kode_ubis = '"+this.cb_ubis.getText()+"' and kode_lokasi = '"+this.app._lokasi+"'",
														 new Array("kode_cc","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
				case 3 :
						this.standarLib.showListDataForSG(this, "Daftar DRK",this.sg2, this.sg2.row, this.sg2.col, 
														"select kode_drk, nama  from rra_drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi = '"+this.app._lokasi+"'",
														"select count(kode_drk) from rra_drk where tahun = '"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi = '"+this.app._lokasi+"'",
														 new Array("kode_drk","nama"),"and",new Array("Kode","Nama"),true);					
						break;					
				case 5 :
						this.standarLib.showListDataForSG(this, "Daftar Akun",this.sg2, this.sg2.row, this.sg2.col, 
														"select kode_akun, nama  from rra_masakun where kode_lokasi = '"+this.app._lokasi+"'",
														"select count(kode_akun) from rra_masakun where kode_lokasi = '"+this.app._lokasi+"'",
														 new Array("kode_akun","nama"),"and",new Array("Kode","Nama"),false);					
						break;					
						
			}						
		}catch(e)
		{
			systemAPI.alert("[app_saku_gl_transaksi_fJu2] : doFindBtnClick : " + e);
		}
	},	
	doCodeClick : function(sender)
	{
		try{		
			this.mDesk.toggleMode();			
			if (this.mDesk.viewMode == 2){
				sender.setHint("Preview");
			}else sender.setHint("Source Code (HTML)");
		}catch(e){
			alert(e);
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
