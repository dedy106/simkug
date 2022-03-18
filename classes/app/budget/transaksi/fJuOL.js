/**
 * @author mr
 */
window.app_budget_transaksi_fJuOL = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fJuOL.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fJuOL";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Jurnal Penyesuaian OutLook: Input", 0);
		try{	
			uses("portalui_datePicker;portalui_saiGrid;portalui_sgNavigator;portalui_saiCBB");			
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,23,180,20],caption:"Tahun Angg.",tag:2,maxLength:4,tipeText:ttAngka,change:[this,"doChange"]});
			this.bGen = new portalui_button(this, {bound: [256, 78, 80, 20],caption: "Gen",icon: "url(icon/" + system.getThemes() + "/process.png)"});
			this.ed_nb = new portalui_saiLabelEdit(this, {bound: [20, 78, 230, 20],caption: "No Bukti",readOnly:true});			
			this.eDebet = new portalui_saiLabelEdit(this,{bound:[720,78,200,20],caption:"Total Debet",readOnly:true,tipeText:ttNilai,text:"0"});
			this.eTahun2 = new portalui_saiLabelEdit(this,{bound:[20,12,180,20],caption:"Tahun CutOff",tag:2,readOnly:true});
			this.i_viewer = new portalui_imageButton(this,{bound:[200,12,20,20],hint:"Load Data",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoadData"]});
			this.eKredit = new portalui_saiLabelEdit(this,{bound:[720,12,200,20],caption:"Total Kredit",readOnly:true,tipeText:ttNilai,text:"0"});
			
			this.p1 = new portalui_panel(this,{bound:[20,30,900,380],caption:"Daftar Jurnal Penyesuaian OutLook"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,895,333],colCount:7,tag:2,
		            colTitle:["Kode Akun","Nama Akun","Keterangan","DC","Nilai","Kode CF","Nama CF"],
					colWidth:[[0,1,2,3,4,5,6],[80,200,400,50,100,50,100]],colFormat:[[4],[cfNilai]],
					buttonStyle:[[0,3,5],[bsEllips,bsAuto,bsEllips]], 
					picklist:[[3],[new portalui_arrayMap({items:["C","D"]})]],ellipsClick:[this,"doEllipseClick"],
					columnReadOnly:[true,[1],[0]],nilaiChange:[this,"doNilaiChange"],change:[this,"doChangeCell"],
					autoAppend:true,defaultRow:1});
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,355,900,25],buttonStyle:2,grid:this.sg1});		
			
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			this.setTabChildIndex(); 

			this.dbLib = new util_dbLib();
		    this.dbLib.addListener(this);
		    this.standarLib = new util_standar();											
			this.bGen.onClick.set(this, "genClick");
			this.sg1.onCellEnter.set(this, "doCellEnter");
			
			this.standarLib.clearByTag(this,["0","1"],undefined);				
			this.baris = this.app._baris;
			this.sg1.clear(1);
			
			var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];							
				this.eTahun.setText(line.tahun);
			}
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fJuOL.extend(window.portalui_childForm);
window.app_budget_transaksi_fJuOL.implement({
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
					this.standarLib.clearByTag(this, new Array("0","8","9"),undefined);				
					this.sg1.clear(1); 
					this.eDebet.setText("0"); this.eKredit.setText("0");
				}
				break;
			case "simpan" :		
				if (nilaiToFloat(this.eDebet.getText()) != nilaiToFloat(this.eKredit.getText())){
					system.alert(this,"Transaksi tidak valid.","Total Debet dan Kredit harus sama.");
					return false;
				}
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abaupost_m','no_post',this.app._lokasi+"-JUOL"+this.eTahun.getText().substr(2,2)+".",'000'));
				var sql = new server_util_arrayList();				

				var tgl = this.eTahun2.getText()+'-12-01';				
				sql.add("delete from agg_abaupost_m where keterangan = 'JUOL' and periode = '"+this.eTahun2.getText()+'12'+"'");
				sql.add("delete from agg_gldt where modul = 'JUOL' and periode = '"+this.eTahun2.getText()+'12'+"'");

				sql.add("insert into agg_abaupost_m(no_post, kode_lokasi, keterangan, tgl_input, nik_user, periode)"+
						"                values('"+this.ed_nb.getText()+"','"+this.app._lokKonsol+"','JUOL',now(), '"+this.app._userLog+"','"+this.eTahun2.getText()+'12'+"')");				
				
				var idx=0;
				for (var i=0;i< this.sg1.getRowCount();i++){
					if (this.sg1.rowValid(i)){
						idx++;
						sql.add("insert into agg_gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_cf) values "+
								"('"+this.ed_nb.getText()+"',"+idx+",'"+this.app._lokKonsol+"','JUOL','-','-','"+tgl+"','"+this.sg1.cells(0,i)+"','"+this.sg1.cells(3,i)+"',"+parseNilai(this.sg1.cells(4,i))+",'"+this.sg1.cells(2,i)+"','-','"+this.eTahun2.getText()+'12'+"','-','IDR',1,"+parseNilai(this.sg1.cells(4,i))+",now(),'"+this.app._userLog+"','-','-','-','-','-','-','"+this.sg1.cells(5,i)+"')");
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
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'agg_abaupost_m','no_post',this.app._lokasi+"-JUOL"+this.eTahun.getText().substr(2,2)+".",'000'));
			}
		}
		catch (e)
		{
			alert(e);
		}
	},
	doLoadData: function(sender){	
		if (this.eTahun2.getText() != "") {
			var data = this.dbLib.getDataProvider("select a.kode_akun,e.nama as nama_akun,a.keterangan,a.dc,a.nilai,a.kode_cf,isnull(xx.nama,'-') as nama_cf "+
										"from agg_gldt a "+
										"         inner join agg_masakun e on a.kode_akun=e.kode_akun and e.kode_lokasi = '"+this.app._lokKonsol+"' "+
										"         left  join agg_neracacf xx on a.kode_cf=xx.kode_neraca and xx.kode_lokasi = '"+this.app._lokKonsol+"' "+
										"where a.periode like '"+this.eTahun2.getText()+"%' and a.modul = 'JUOL' "+  
										"order by a.dc desc", true);			
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg1.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg1.appendData([ line.kode_akun,line.nama_akun,line.keterangan,line.dc,floatToNilai(line.nilai),line.kode_cf,line.nama_cf]);
				}
			} else this.sg1.clear(1);
			this.sg1.validasi();
		}
	},
	doChange: function(sender) {
		if (this.eTahun.getText() != "") {
			var sql = new server_util_arrayList(); 
			sql.add("select kode_akun, nama from agg_masakun where kode_lokasi='"+this.app._lokasi+"'");
			sql.add("select kode_pp, nama from agg_pp where tipe='posting' and kode_lokasi='"+this.app._lokasi+"'");
			this.dbLib.getMultiDataProviderA(sql);
			
			this.eTahun2.setText(parseFloat(this.eTahun.getText()) - 1);
		}
	},
	doNilaiChange: function(){		
		var debet = kredit = 0;
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
		sender.onChange.set(this,"doChangeCell");
	},
	doCellEnter: function(sender, col, row){
		try
		{
			switch(col)
			{
				case 2 : 
					if (this.sg1.getCell(2,row) == ""){
						if (row == 0) this.sg1.setCell(2,row,"-");
						else this.sg1.setCell(2,row,this.sg1.getCell(2,(row-1)) );
					}
					break;
				case 4 : 
					/*if ((this.sg1.getCell(4,row) == "" || this.sg1.getCell(4,row) == "0") && (row >= 0)) {
						var sls = nilaiToFloat(this.eDebet.getText()) - nilaiToFloat(this.eKredit.getText());
						sls = Math.abs(sls); 
						this.sg1.setCell(4,row,floatToNilai(sls));
					}*/
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
					this.standarLib.showListData(this, "Daftar CF",sender,undefined, 
												  "select kode_neraca, nama  from agg_neracacf where kode_lokasi = '"+this.app._lokasi+"' and tipe = 'Posting' order by kode_neraca",
												  "select count(kode_neraca) from agg_neracacf where kode_lokasi = '"+this.app._lokasi+"' and tipe = 'Posting' ",
												  ["kode_neraca","nama"],"and",["Kode","Nama"],true);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
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
