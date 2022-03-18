/**
 * @author mr
 */
window.app_budget_transaksi_fPostGaji = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fPostGaji.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fPostGaji";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Posting Anggaran Beban SDM: Input", 0);
		try{	
			uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator;portalui_saiCBB");			
			this.lblTgl1 = new portalui_label(this, {bound: [20, 32, 101, 20],caption: "Tanggal",underline: true});						
			this.dp_tgl1 = new portalui_datePicker(this, {bound: [120, 32, 90, 18]});				
			this.bGen = new portalui_button(this, {bound: [256, 78, 80, 20],caption: "Gen",icon: "url(icon/" + system.getThemes() + "/process.png)"});				
			this.ed_nb = new portalui_saiLabelEdit(this, {bound: [20, 78, 230, 20],caption: "No Bukti",readOnly:true});			
			this.ed_desc = new portalui_saiLabelEdit(this, {bound: [20, 10, 500, 20],caption: "Deskripsi",maxLength: 150,tag:1});										
			this.cJenis = new portalui_saiCB(this,{bound:[20,13,180,20],caption:"Jenis",items:["GAJI"],tag:2});
			this.eDebet = new portalui_saiLabelEdit(this,{bound:[720,13,200,20],caption:"Total Debet",readOnly:true,tipeText:ttNilai,text:"0"});			
			this.cbPeriode = new portalui_saiCB(this,{bound:[20,12,180,20],caption:"Periode",mustCheck: false,tag:2,change:[this,"doChange"]});
			this.i_viewer = new portalui_imageButton(this,{bound:[200,12,20,20],hint:"Load Data",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoadData"]});
			this.eKredit = new portalui_saiLabelEdit(this,{bound:[720,12,200,20],caption:"Total Kredit",readOnly:true,tipeText:ttNilai,text:"0"});
			
			this.p0 = new portalui_panel(this,{bound: [20, 231, 900, 355],caption: "Daftar Jurnal Anggaran SDM"});	    				
			this.sg0 = new portalui_saiGrid(this.p0, {bound: [1, 20, 895, 308],colCount: 11,
					colTitle:["Kode RKA","Nama RKA","Kode DRK","Nama DRK","Kode Akun","Nama Akun","Kode BU","Bisnis Unit","Periode","Nilai","DC"],
					colWidth:[[10,9,8,7,6,5,4,3,2,1,0],[50,100,70,100,60,120,80,120,80,120,100]],
					colFormat:[[9],[cfNilai]],readOnly:true,defaultRow:1,nilaiChange:[this,"doNilaiChange"]});
			this.sgNav0 = new portalui_sgNavigator(this.p0, {bound: [1, 330, 897, 25],grid: this.sg0,border: 0,buttonStyle: 3});		
			
			this.p1 = new portalui_panel(this,{bound:[20,30,900,280],caption:"Daftar Jurnal Tambahan"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,895,233],colCount:9,tag:2,
		            colTitle:["Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode BU","Bisnis Unit","Kode RKA","Nama RKA"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[80,100,200,50,100,60,100,60,100]],colFormat:[[4],[cfNilai]],
					buttonStyle:[[0,3,5,7],[bsEllips,bsAuto,bsEllips,bsEllips]], 
					picklist:[[3],[new portalui_arrayMap({items:["C","D"]})]],ellipsClick:[this,"doEllipseClick"],
					columnReadOnly:[true,[1,6,8],[0]],nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],autoAppend:true,defaultRow:1});
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,255,900,25],buttonStyle:2,grid:this.sg});		
			
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.setTabChildIndex(); 

			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    this.standarLib = new util_standar();											
			this.dp_tgl1.onSelect.set(this, "doSelect");
			this.bGen.onClick.set(this, "genClick");
			this.sg1.onCellEnter.set(this, "doCellEnter");
			this.sgNav0.onPager.set(this, "doPager");
			this.ed_period= this.dp_tgl1.getYear().toString()+(this.dp_tgl1.getMonth() < 10 ? "0" : "") +this.dp_tgl1.getMonth();
			this.standarLib.clearByTag(this,["0","1"],this.dp_tgl1);				
			this.baris = this.app._baris;
			this.sg0.clear(1);
			this.sg1.clear(1);
			
			var sql = new server_util_arrayList(); 
			sql.add("select kode_akun, nama from agg_masakun where kode_lokasi='"+this.app._lokasi+"'");
			sql.add("select kode_pp, nama from agg_pp where tipe='posting' and kode_lokasi='"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
			
			var prd = this.dbLib.getDataProvider("select distinct periode from agg_gaji_d where kode_lokasi = '"+this.app._lokasi+"' and posted = 'F' "+
												 "order by periode",true);
			if (typeof prd == "object"){
				var items = [];
				for (var i in prd.rs.rows) items.push(prd.rs.rows[i].periode);			
				this.cbPeriode.setItem(new portalui_arrayMap({items:items}));
			}
			this.cbPeriode.setText(this.app._periode);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fPostGaji.extend(window.portalui_childForm);
window.app_budget_transaksi_fPostGaji.implement({
	mainButtonClick : function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");		
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");		
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");		
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event)
		{
			case "clear" :
				if (modalResult == mrOk)
				{
					this.standarLib.clearByTag(this, new Array("0","8","9"),this.dp_tgl1);				
					this.doSelect(this.dp_tgl1,this.dp_tgl1.year,this.dp_tgl1.month,this.dp_tgl1.day);
					this.sg0.clear(1); 
					this.sg1.clear(1); 
				}
				break;
			case "simpan" :		
				if (nilaiToFloat(this.eDebet.getText()) != nilaiToFloat(this.eKredit.getText())){
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit harus sama.");
					return false;
				}
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_gajipost_m','no_post',this.app._lokasi+"-POGJ"+this.dp_tgl1.getThnBln().substr(2,2)+""+(this.dp_tgl1.getMonth()< 10 ?"0":"")+this.dp_tgl1.getMonth()+".",'0000'));
				var sql = new server_util_arrayList();				
				sql.add("insert into agg_gajipost_m(no_post, kode_lokasi, tanggal, keterangan, tgl_input, nik_user, periode, jenis)"+
						"                    values('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_tgl1.getDateString()+"','"+this.ed_desc.getText()+"',now(), '"+this.app._userLog+"','"+this.cbPeriode.getText()+"','"+this.cJenis.getText()+"')");
				
				if (this.cJenis.getText() == "GAJI") {					
					sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) "+
							"select '"+this.ed_nb.getText()+"',0,a.kode_lokasi,'GAJI','GAJI','-','"+this.dp_tgl1.getDateString()+"',b.kode_akun,'D',sum(a.nilai),'"+this.ed_desc.getText()+"',a.kode_pp,'"+this.cbPeriode.getText()+"',b.kode_rka,'IDR',1,sum(a.nilai),now(),'"+this.app._userLog+"','-','-','-','-','-','-' "+							
							"from agg_gaji_d a "+
							"               inner join agg_param b on a.kode_param=b.kode_param and a.kode_lokasi=b.kode_lokasi and substring(a.periode,1,4)=b.tahun "+
							"where a.nilai<> 0 and a.periode='"+this.cbPeriode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted='F' "+
							"group by a.kode_lokasi,b.kode_rka,b.kode_akun,a.kode_pp,a.periode ");
					sql.add("update agg_gaji_d set posted = 'T' where periode='"+this.cbPeriode.getText()+"' and kode_lokasi='"+this.app._lokasi+"' and posted='F' ");
				}
				var idx=99999;
				for (var i=0;i< this.sg1.getRowCount();i++){
					if (this.sg1.rowValid(i)){
						idx++;
						sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) values "+
								"('"+this.ed_nb.getText()+"',"+idx+",'"+this.app._lokasi+"','GAJI','ADD','-','"+this.dp_tgl1.getDateString()+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(3,i)+"',"+parseNilai(this.sg1.cells(4,i))+",'"+this.sg1.cells(2,i)+"','"+this.sg1.cells(5,i)+"','"+this.cbPeriode.getText()+"','"+this.sg1.cells(7,i)+"','IDR',1,"+parseNilai(this.sg1.cells(4,i))+",now(),'"+this.app._userLog+"','-','-','-','-','-','-')");
					}
				}							
				this.dbLib.execArraySQL(sql);
				break;
			case "simpancek" : this.simpan();
				break;
		}
	},
	genClick: function(sender){
		try{
			if (this.ed_period != ""){
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_gajipost_m','no_post',this.app._lokasi+"-POGJ"+this.dp_tgl1.getThnBln().substr(2,2)+""+(this.dp_tgl1.getMonth()< 10 ?"0":"")+this.dp_tgl1.getMonth()+".",'0000'));
				this.ed_desc.setFocus();
			}
		}
		catch (e)
		{
			alert(e);
		}
	},
	doChange: function(sender) {
		if (this.cbPeriode.getText() != "")
			sql.add("select kode_rka, nama from agg_rka where kode_lokasi='"+this.app._lokasi+"' and tahun ='"+this.cbPeriode.getText().substr(0,4)+"'");
	},
	doLoadData: function(sender){	
		if (this.cbPeriode.getText() != "") {			
			var data = this.dbLib.getDataProvider(
								    "select c.kode_rka,c.nama as nama_rka,d.kode_drk,d.nama as nama_drk,x.kode_akun,e.nama as nama_akun,a.kode_pp,f.nama as nama_pp,a.periode,sum(a.nilai) as total,'D' as dc  "+
									"from agg_gaji_d a "+
									"				   inner join agg_param x on a.kode_param=x.kode_param and a.kode_lokasi=x.kode_lokasi and substring(a.periode,1,4)=x.tahun "+
									"                  inner join agg_rka c on x.kode_rka=c.kode_rka and x.kode_lokasi=c.kode_lokasi and x.tahun=c.tahun "+
									"                  inner join agg_drk d on c.kode_drk=d.kode_drk and c.kode_lokasi=d.kode_lokasi and c.tahun=d.tahun "+
									"                  inner join agg_masakun e on x.kode_akun=e.kode_akun and x.kode_lokasi=e.kode_lokasi "+
									"                  inner join agg_pp f on a.kode_pp=f.kode_pp and a.kode_lokasi=f.kode_lokasi "+
									"where a.nilai<>0 and a.periode='"+this.cbPeriode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' and a.posted='F' "+
									"group by c.kode_rka,c.nama,d.kode_drk,d.nama,x.kode_akun,e.nama,a.kode_pp,f.nama,a.periode "+
									"order by c.kode_rka,x.kode_akun,a.kode_pp", 
									true);			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.dataABAU = data;
				this.rowPerPage = 20;
				this.sgNav0.setTotalPage(Math.ceil(data.rs.rows.length/ 20));
				this.sgNav0.rearrange();
				this.sgNav0.activePage = 0;								
				this.doPagerSG0(1);
			} else systemAPI.alert("Data tidak ditemukan.");
			this.sg0.validasi();
		}
	},
	doPagerSG0: function(page){
		var start = (page - 1) * this.rowPerPage;
		var finish = start + this.rowPerPage;
		finish = finish > this.dataABAU.rs.rows.length ? this.dataABAU.rs.rows.length:finish;
		var line;
		this.sg0.clear();
		for (var i= start; i < finish; i++){
			line = this.dataABAU.rs.rows[i];
			this.sg0.appendData([line.kode_rka,line.nama_rka,line.kode_drk,line.nama_drk,line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.periode,floatToNilai(line.total),line.dc.toUpperCase()]);
		}
		this.sg0.setNoUrut(start);			
	},
	doSelect: function(sender, year, month, day){
		if (month < 10)
			month = "0"+month;
		this.ed_period= year.toString()+month;
	},
	doNilaiChange: function(){		
		var debet = kredit = 0;
		/*for (var i = 0;i < this.sg0.getRowCount();i++){
			if (this.sg0.cells(9,i) != "") {
				debet += nilaiToFloat(this.sg0.cells(9,i)); 
			}
		}
		* */
		var line;
		for (var i in this.dataABAU.rs.rows){
			line = this.dataABAU.rs.rows[i];
			if (line.dc.toUpperCase() == 'D')
				debet += parseFloat(line.total); 					
			else kredit += parseFloat(line.total); 					
		}
		for (var i = 0; i < this.sg1.rows.getLength();i++){
			if (this.sg1.rowValid(i) && this.sg1.getCell(4,i) != ""){
				if (this.sg1.getCell(3,i).toUpperCase() == "C") kredit += nilaiToFloat(this.sg1.getCell(4,i));			
				if (this.sg1.getCell(3,i).toUpperCase() == "D") debet += nilaiToFloat(this.sg1.getCell(4,i));			
			}
		}
		this.eDebet.setText(floatToNilai(debet));
		this.eKredit.setText(floatToNilai(kredit));
	},
	doChangeCell: function(sender, col, row){
		if ((col == 3 || col == 4) && (this.sg1.getCell(4,row) != "")){
			this.sg1.validasi();
		}
		sender.onChange.set(this,undefined);
	    if (col == 0) {
			var akun = this.dataAkun.get(sender.cells(0,row));
			if(akun)
				sender.cells(1,row,akun);
			else {                                    
				if (trim(sender.cells(0,row)) != "") system.alert(this,"Akun "+sender.cells(0,row)+" tidak ditemukan","Coba akun yang lainnya.","checkAkun");                
				sender.cells(0,row,"");
				sender.cells(1,row,"");
			}
		}
		if (col == 5) {
			var pp = this.dataPP.get(sender.cells(5,row));
			if (pp) sender.cells(6,row,pp);
			else sender.cells(6,row,"-");
		}
	    if (col == 7) {
		   var drk = this.dataDRK.get(sender.cells(7,row));
		   if (drk) sender.cells(8,row,drk);
		   else sender.cells(8,row,"-");
		}
		sender.onChange.set(this,"doChangeCell");
	},
	doCellEnter: function(sender, col, row){
		try
		{
			switch(col)
			{
				case 2 : 
					if (this.sg1.getCell(2,row) == ""){
						if (row == 0) this.sg1.setCell(2,row,this.ed_desc.getText());
						else this.sg1.setCell(2,row,this.sg1.getCell(2,(row-1)) );
					}
					break;
				case 4 : 
					if ((this.sg1.getCell(4,row) == "" || this.sg1.getCell(4,row) == "0") && (row >= 0)) {
						var sls = nilaiToFloat(this.eDebet.getText()) - nilaiToFloat(this.eKredit.getText());
						sls = Math.abs(sls); 
						this.sg1.setCell(4,row,floatToNilai(sls));
					}
					break;
			}
		}catch(e)
		{
			alert("doFindBtnClick : " + e);
		}	
	},
	doEllipseClick: function(sender, col, row){
		try{			
			if (sender == this.sg1) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun, nama  from agg_masakun where kode_lokasi = '"+this.app._lokasi+"' order by kode_akun",
												  "select count(kode_akun) from agg_masakun where kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 5){
					this.standarLib.showListData(this, "Daftar Bisnis Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' order by kode_pp",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 7){
					this.standarLib.showListData(this, "Daftar RKA",sender,undefined, 
													  "select kode_rka, nama  from agg_rka where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.cbPeriode.getText().substr(0,4)+"' order by kode_rka",
													  "select count(kode_rka) from agg_rka where kode_lokasi='"+this.app._lokasi+"' and tahun='"+this.cbPeriode.getText().substr(0,4)+"'",
													  new Array("kode_rka","nama"),"and",new Array("Kode RKA","Nama RKA"),true);
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page){
		if (sender == this.sg0) this.doPagerSG0(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib)
		{
			try
			{   
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
					if (result.toLowerCase().search("error") == -1)					
					{						
						this.app._mainForm.pesan(2,"Transaksi sukses tersimpan dengan no bukti :("+ this.ed_nb.getText()+")");						
						this.app._mainForm.bClear.click();              						
					}else system.info(this,result,"");
	    			break;	      			
					case "listData" :
						this.sg1.clear(1); 
					break;
					case "getMultiDataProvider":
	    			    eval("result = "+result+";");
	    			    if (typeof result != "string"){
                            this.dataAkun = new portalui_arrayMap();
							this.dataPP = new portalui_arrayMap();
							this.dataDRK = new portalui_arrayMap();
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
	    			                this.dataDRK.set(line.kode_rka, line.nama);
                                }
                            }
                        }else throw result;
	    			break;
	    		}
			}
			catch(e)
			{
				alert(e);
			}
	    }
	}
});
